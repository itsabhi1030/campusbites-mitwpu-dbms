#ifndef CAMPUSBITES_ENGINE_HPP
#define CAMPUSBITES_ENGINE_HPP

#include "Models.hpp"
#include "CampusGraph.hpp"
#include "KitchenPriorityQueue.hpp"
#include "Dispatcher.hpp"
#include <iostream>
#include <vector>
#include <memory>
#include <sstream>
#include <iomanip>

namespace CampusBites {

/**
 * High-Level CampusBites Algorithmic Management Engine.
 * Orchestrates multi-tenant KDS queues, graph routing, and courier dispatch.
 */
class CampusBitesEngine {
private:
    CampusGraph graph;
    KitchenDisplayEngine kds;
    Dispatcher dispatcher;
    std::vector<std::shared_ptr<Order>> allOrders;
    int orderCounter;

public:
    CampusBitesEngine() : dispatcher(graph), orderCounter(1001) {}

    /**
     * Submits a new customer meal order into the system.
     */
    std::shared_ptr<Order> placeOrder(
        const std::string& customerName,
        const std::string& customerEmail,
        const std::string& outletId,
        const std::string& outletName,
        const std::string& deliveryBlock,
        const std::vector<OrderItem>& items,
        int prepTimeMins = 12,
        bool isRush = false)
    {
        std::string orderId = "ORD-" + std::to_string(orderCounter++);
        double total = 0.0;
        for (const auto& item : items) {
            total += (item.price * item.quantity);
        }

        auto order = std::make_shared<Order>(
            orderId, customerName, customerEmail,
            outletId, outletName, deliveryBlock,
            items, total, prepTimeMins, isRush
        );

        allOrders.push_back(order);

        // Enqueue into outlet's isolated KDS Priority Queue
        kds.enqueueOrder(order);

        return order;
    }

    /**
     * Simulates kitchen finishing order preparation and triggering rider dispatch.
     */
    DispatchResult finishCookingAndDispatch(const std::string& outletId) {
        auto readyOrder = kds.dequeueReadyOrder(outletId);
        if (!readyOrder) {
            DispatchResult res;
            res.success = false;
            res.message = "No pending orders to cook for outlet: " + outletId;
            return res;
        }

        // Dispatch to optimal courier rider
        return dispatcher.dispatchOrder(readyOrder, "Food Court");
    }

    /**
     * Marks an order as delivered at destination block.
     */
    bool markDelivered(const std::string& orderNumber) {
        for (auto& ord : allOrders) {
            if (ord->orderNumber == orderNumber) {
                return dispatcher.completeDelivery(ord);
            }
        }
        return false;
    }

    CampusGraph& getGraph() { return graph; }
    KitchenDisplayEngine& getKds() { return kds; }
    Dispatcher& getDispatcher() { return dispatcher; }
    const std::vector<std::shared_ptr<Order>>& getAllOrders() const { return allOrders; }
};

} // namespace CampusBites

#endif // CAMPUSBITES_ENGINE_HPP
