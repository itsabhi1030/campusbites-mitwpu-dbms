#ifndef CAMPUSBITES_DISPATCHER_HPP
#define CAMPUSBITES_DISPATCHER_HPP

#include "Models.hpp"
#include "CampusGraph.hpp"
#include <iostream>
#include <vector>
#include <unordered_map>
#include <memory>
#include <limits>
#include <iomanip>

namespace CampusBites {

/**
 * Result of dispatching an order to a courier rider.
 */
struct DispatchResult {
    bool success;
    std::string orderNumber;
    std::string riderEmail;
    std::string riderName;
    std::string vehicleNumber;
    std::string pickupNode;
    std::string deliveryBlock;
    double pickupDistanceMeters;
    double deliveryDistanceMeters;
    double totalEtaMinutes;
    std::vector<std::string> transitRoute;
    std::string message;
};

/**
 * Smart Autonomous Rider Dispatch Engine.
 * Matches ready meal orders to the optimal EV courier rider using a multi-criteria optimization function.
 */
class Dispatcher {
private:
    std::unordered_map<std::string, Rider> fleet;
    const CampusGraph& campusMap;

public:
    explicit Dispatcher(const CampusGraph& graph) : campusMap(graph) {
        initDefaultMitWpuFleet();
    }

    /**
     * Initializes the 6 MIT-WPU Campus Courier Riders from VIVA_CREDENTIALS.md.
     */
    void initDefaultMitWpuFleet() {
        fleet.clear();
        addRider(Rider("rider1@mitwpu.edu.in", "Suresh Kumar", "MH-12-AB-4567", "+91-9765432100", 4.9, "Food Court"));
        addRider(Rider("rider2@mitwpu.edu.in", "Ramesh Shinde", "MH-12-CD-8901", "+91-9822334455", 4.8, "Saraswati Block"));
        addRider(Rider("rider3@mitwpu.edu.in", "Amit Patil", "MH-12-EF-2345", "+91-9977665544", 4.9, "Chanakya Block"));
        addRider(Rider("rider4@mitwpu.edu.in", "Vikas Deshmukh", "MH-12-GH-6789", "+91-9123456780", 4.7, "Main Gate"));
        addRider(Rider("rider5@mitwpu.edu.in", "Rahul Kulkarni", "MH-12-JK-0123", "+91-9345678901", 4.8, "Peace Dome"));
        addRider(Rider("rider6@mitwpu.edu.in", "Sachin More", "MH-12-LM-4567", "+91-9567890123", 4.9, "Food Court"));
    }

    void addRider(const Rider& r) {
        fleet.insert_or_assign(r.email, r);
    }

    /**
     * Algorithmic Dispatch: Evaluates all available riders using Dijkstra distance and load-balancing weights.
     * Metric: Cost = Distance(Rider -> FoodCourt) + (ActiveDeliveries * 250) - (Rating * 60)
     */
    DispatchResult dispatchOrder(const std::shared_ptr<Order>& order, const std::string& pickupNode = "Food Court") {
        DispatchResult result;
        result.success = false;
        result.orderNumber = order ? order->orderNumber : "";
        result.pickupNode = pickupNode;
        result.deliveryBlock = order ? order->deliveryBlock : "";
        result.pickupDistanceMeters = 0.0;
        result.deliveryDistanceMeters = 0.0;
        result.totalEtaMinutes = 0.0;

        if (!order) {
            result.message = "Null order provided for dispatch.";
            return result;
        }

        std::string bestRiderEmail = "";
        double minCost = std::numeric_limits<double>::infinity();
        double bestPickupDist = 0.0;

        // Iterate through all fleet partners to find optimal rider
        for (const auto& [email, rider] : fleet) {
            if (!rider.isAvailable && rider.activeDeliveries >= 2) {
                continue; // Rider is at maximum capacity
            }

            // Calculate distance from rider's current location to Food Court
            RouteResult toPickup = campusMap.findShortestRoute(rider.currentLocationNode, pickupNode);
            double distToPickup = toPickup.found ? toPickup.totalDistanceMeters : 1000.0;

            // Multi-criteria optimization cost function
            double cost = distToPickup + (rider.activeDeliveries * 250.0) - (rider.rating * 60.0);

            if (cost < minCost) {
                minCost = cost;
                bestRiderEmail = email;
                bestPickupDist = distToPickup;
            }
        }

        if (bestRiderEmail.empty()) {
            result.message = "All 6 courier riders are currently busy. Order queued for next available dispatch.";
            return result;
        }

        // Assign order to selected rider
        Rider& assignedRider = fleet.at(bestRiderEmail);
        assignedRider.isAvailable = false;
        assignedRider.activeDeliveries += 1;

        // Calculate delivery route from Food Court to Student's Delivery Block
        RouteResult deliveryRoute = campusMap.findShortestRoute(pickupNode, order->deliveryBlock);

        // Update Order details
        order->assignedRiderEmail = assignedRider.email;
        order->assignedRiderName = assignedRider.name;
        order->status = OrderStatus::OUT_FOR_DELIVERY;

        result.success = true;
        result.riderEmail = assignedRider.email;
        result.riderName = assignedRider.name;
        result.vehicleNumber = assignedRider.vehicleNumber;
        result.pickupDistanceMeters = bestPickupDist;
        result.deliveryDistanceMeters = deliveryRoute.totalDistanceMeters;
        result.totalEtaMinutes = deliveryRoute.estimatedTransitMinutes + (bestPickupDist / (5.5 * 60.0));
        result.transitRoute = deliveryRoute.path;
        result.message = "Assigned to " + assignedRider.name + " (" + assignedRider.vehicleNumber + ")";

        return result;
    }

    /**
     * Marks an order as delivered, updates telemetry and frees rider capacity.
     */
    bool completeDelivery(const std::shared_ptr<Order>& order) {
        if (!order || order->assignedRiderEmail.empty()) return false;

        auto it = fleet.find(order->assignedRiderEmail);
        if (it == fleet.end()) return false;

        Rider& rider = it->second;
        rider.activeDeliveries = std::max(0, rider.activeDeliveries - 1);
        rider.completedDeliveries += 1;
        rider.isAvailable = (rider.activeDeliveries == 0);
        rider.currentLocationNode = order->deliveryBlock; // Rider is now at student's building

        order->status = OrderStatus::DELIVERED;
        return true;
    }

    /**
     * Displays real-time rider telemetry matching Admin Fleet View.
     */
    void displayFleetStatus() const {
        std::cout << "\n========================================================================================\n";
        std::cout << " [MIT-WPU COURIER FLEET TELEMETRY] Smart Dispatch & Fleet Status\n";
        std::cout << "========================================================================================\n";
        std::cout << " " << std::left << std::setw(20) << "Rider Name"
                  << std::setw(16) << "Vehicle"
                  << std::setw(8) << "Rating"
                  << std::setw(18) << "Current Location"
                  << std::setw(14) << "Status"
                  << std::setw(10) << "Delivered" << "\n";
        std::cout << "----------------------------------------------------------------------------------------\n";

        for (const auto& [email, r] : fleet) {
            std::string statusStr = r.isAvailable ? "Available" : ("Busy (" + std::to_string(r.activeDeliveries) + " active)");
            std::cout << " " << std::left << std::setw(20) << r.name
                      << std::setw(16) << r.vehicleNumber
                      << std::setw(8) << std::fixed << std::setprecision(1) << r.rating
                      << std::setw(18) << r.currentLocationNode
                      << std::setw(14) << statusStr
                      << std::setw(10) << r.completedDeliveries << "\n";
        }
        std::cout << "========================================================================================\n\n";
    }

    const std::unordered_map<std::string, Rider>& getFleet() const {
        return fleet;
    }
};

} // namespace CampusBites

#endif // CAMPUSBITES_DISPATCHER_HPP
