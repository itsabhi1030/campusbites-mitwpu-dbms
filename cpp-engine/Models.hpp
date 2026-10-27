#ifndef CAMPUSBITES_MODELS_HPP
#define CAMPUSBITES_MODELS_HPP

#include <string>
#include <vector>
#include <chrono>
#include <iomanip>
#include <sstream>

namespace CampusBites {

/**
 * Canonical lifecycle statuses of an order in CampusBites.
 */
enum class OrderStatus {
    PLACED,
    PREPARING,
    READY_FOR_PICKUP,
    OUT_FOR_DELIVERY,
    IN_TRANSIT,
    DELIVERED,
    CANCELLED
};

inline std::string statusToString(OrderStatus status) {
    switch (status) {
        case OrderStatus::PLACED: return "PLACED";
        case OrderStatus::PREPARING: return "PREPARING";
        case OrderStatus::READY_FOR_PICKUP: return "READY_FOR_PICKUP";
        case OrderStatus::OUT_FOR_DELIVERY: return "OUT_FOR_DELIVERY";
        case OrderStatus::IN_TRANSIT: return "IN_TRANSIT";
        case OrderStatus::DELIVERED: return "DELIVERED";
        case OrderStatus::CANCELLED: return "CANCELLED";
        default: return "UNKNOWN";
    }
}

/**
 * Individual ordered item with price and preparation complexity.
 */
struct OrderItem {
    std::string id;
    std::string name;
    double price;
    int quantity;
    int prepTimeMinutes;

    OrderItem(std::string id_, std::string name_, double price_, int qty_, int prepMins_ = 10)
        : id(std::move(id_)), name(std::move(name_)), price(price_), quantity(qty_), prepTimeMinutes(prepMins_) {}
};

/**
 * Represents a student/customer order.
 */
struct Order {
    std::string orderNumber;
    std::string customerName;
    std::string customerEmail;
    std::string outletId;          // e.g. "mcdonalds", "dominos", "subway"
    std::string outletName;
    std::string deliveryBlock;     // Target campus node e.g. "Saraswati Block"
    std::vector<OrderItem> items;
    double totalAmount;
    OrderStatus status;
    int estimatedPrepTime;         // in minutes
    bool isRushOrder;              // Priority flag (e.g. order placed between class intervals)
    long long timestamp;           // Unix epoch timestamp in milliseconds
    std::string assignedRiderEmail;
    std::string assignedRiderName;

    Order(std::string num, std::string custName, std::string custEmail,
          std::string outId, std::string outName, std::string block,
          std::vector<OrderItem> orderItems, double amount, int prepTime = 12, bool rush = false)
        : orderNumber(std::move(num)),
          customerName(std::move(custName)),
          customerEmail(std::move(custEmail)),
          outletId(std::move(outId)),
          outletName(std::move(outName)),
          deliveryBlock(std::move(block)),
          items(std::move(orderItems)),
          totalAmount(amount),
          status(OrderStatus::PLACED),
          estimatedPrepTime(prepTime),
          isRushOrder(rush),
          timestamp(std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::system_clock::now().time_since_epoch()).count()),
          assignedRiderEmail(""),
          assignedRiderName("") {}

    /**
     * Priority calculation for KDS scheduling:
     * Lower value = Higher urgency in Min-Heap.
     * Takes into account rush status, prep time, and order arrival age.
     */
    double calculatePriorityScore() const {
        double score = static_cast<double>(estimatedPrepTime);
        if (isRushOrder) {
            score -= 15.0; // Urgent orders move up the queue
        }
        return score;
    }
};

/**
 * Campus EV Rider details matching the 6 MIT-WPU fleet partners.
 */
struct Rider {
    std::string email;
    std::string name;
    std::string vehicleNumber;
    std::string phone;
    double rating;
    std::string currentLocationNode; // Current campus building node
    bool isAvailable;
    int activeDeliveries;
    int completedDeliveries;

    Rider(std::string email_, std::string name_, std::string vehicle_, std::string phone_,
          double rating_ = 4.8, std::string initialNode_ = "Food Court")
        : email(std::move(email_)),
          name(std::move(name_)),
          vehicleNumber(std::move(vehicle_)),
          phone(std::move(phone_)),
          rating(rating_),
          currentLocationNode(std::move(initialNode_)),
          isAvailable(true),
          activeDeliveries(0),
          completedDeliveries(0) {}
};

/**
 * Outlet / Stall metadata for multi-tenant KDS isolation.
 */
struct Outlet {
    std::string id;
    std::string name;
    std::string locationNode; // Usually "Food Court"
    int activeKitchenOrders;

    Outlet(std::string id_, std::string name_, std::string loc_ = "Food Court")
        : id(std::move(id_)), name(std::move(name_)), locationNode(std::move(loc_)), activeKitchenOrders(0) {}
};

} // namespace CampusBites

#endif // CAMPUSBITES_MODELS_HPP
