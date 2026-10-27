#ifndef CAMPUSBITES_KITCHENPRIORITYQUEUE_HPP
#define CAMPUSBITES_KITCHENPRIORITYQUEUE_HPP

#include "Models.hpp"
#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <unordered_map>
#include <memory>
#include <iomanip>

namespace CampusBites {

/**
 * Custom Comparator for the KDS Priority Queue.
 * Implements deadline-aware, rush-prioritized scheduling.
 * In std::priority_queue (Max-Heap by default), returning true means 'a' has LOWER priority than 'b'.
 */
struct OrderPriorityComparator {
    bool operator()(const std::shared_ptr<Order>& a, const std::shared_ptr<Order>& b) const {
        if (!a || !b) return false;

        // 1. Rush/Urgent orders take strict precedence
        if (a->isRushOrder != b->isRushOrder) {
            // If 'b' is rush and 'a' is not, 'a' has lower priority (return true)
            return !a->isRushOrder && b->isRushOrder;
        }

        // 2. Shortest Estimated Prep Time (Shortest Job First heuristic)
        if (a->estimatedPrepTime != b->estimatedPrepTime) {
            // Lower prep time should be served first, so higher prep time means lower priority
            return a->estimatedPrepTime > b->estimatedPrepTime;
        }

        // 3. FIFO tie-breaker based on order arrival timestamp
        return a->timestamp > b->timestamp;
    }
};

/**
 * Multi-Tenant Kitchen Display System (KDS) Priority Manager.
 * Maintains isolated priority queues for each campus brand outlet (McDonald's, Domino's, etc.)
 * as well as cross-outlet unified monitoring for the Master Kitchen Supervisor.
 */
class KitchenDisplayEngine {
private:
    using KdsQueue = std::priority_queue<std::shared_ptr<Order>,
                                         std::vector<std::shared_ptr<Order>>,
                                         OrderPriorityComparator>;

    // Outlet-specific isolated priority queues: outlet_id -> Queue
    std::unordered_map<std::string, KdsQueue> outletQueues;

    // Fast lookup for active order references
    std::unordered_map<std::string, std::shared_ptr<Order>> activeOrders;

public:
    KitchenDisplayEngine() = default;

    /**
     * Enqueues a new order into its corresponding restaurant's isolated KDS queue.
     * Time Complexity: O(log N) where N is number of orders in that outlet queue.
     */
    void enqueueOrder(const std::shared_ptr<Order>& order) {
        if (!order) return;
        order->status = OrderStatus::PREPARING;
        activeOrders[order->orderNumber] = order;
        outletQueues[order->outletId].push(order);
    }

    /**
     * Inspects the next highest-priority order for a specific kitchen outlet.
     */
    std::shared_ptr<Order> peekNextOrder(const std::string& outletId) {
        auto it = outletQueues.find(outletId);
        if (it == outletQueues.end() || it->second.empty()) {
            return nullptr;
        }
        return it->second.top();
    }

    /**
     * Pops and transitions the next order in the kitchen queue to READY_FOR_PICKUP.
     * Time Complexity: O(log N).
     */
    std::shared_ptr<Order> dequeueReadyOrder(const std::string& outletId) {
        auto it = outletQueues.find(outletId);
        if (it == outletQueues.end() || it->second.empty()) {
            return nullptr;
        }
        std::shared_ptr<Order> readyOrder = it->second.top();
        it->second.pop();
        readyOrder->status = OrderStatus::READY_FOR_PICKUP;
        return readyOrder;
    }

    /**
     * Returns total pending orders in a given outlet queue.
     */
    size_t getQueueSize(const std::string& outletId) const {
        auto it = outletQueues.find(outletId);
        if (it == outletQueues.end()) return 0;
        return it->second.size();
    }

    /**
     * Displays the current active orders in a specific kitchen's terminal.
     */
    void displayOutletTerminal(const std::string& outletId, const std::string& outletDisplayName) {
        std::cout << "\n--------------------------------------------------------------\n";
        std::cout << " [KITCHEN KDS TERMINAL] Outlet: " << outletDisplayName << " (ID: " << outletId << ")\n";
        std::cout << "--------------------------------------------------------------\n";

        auto it = outletQueues.find(outletId);
        if (it == outletQueues.end() || it->second.empty()) {
            std::cout << "  (No active prep tickets in queue - Kitchen idle)\n";
            std::cout << "--------------------------------------------------------------\n";
            return;
        }

        // Copy queue to inspect items without destroying the state
        KdsQueue tempQueue = it->second;
        int rank = 1;
        while (!tempQueue.empty()) {
            auto order = tempQueue.top();
            tempQueue.pop();

            std::cout << "  #" << rank++ << " Ticket [" << order->orderNumber << "] "
                      << "Customer: " << order->customerName << "\n"
                      << "     Destination: " << order->deliveryBlock
                      << " | Prep: " << order->estimatedPrepTime << " mins"
                      << (order->isRushOrder ? " [⭐ RUSH PRIORITY]" : "") << "\n"
                      << "     Items: ";
            for (size_t i = 0; i < order->items.size(); ++i) {
                std::cout << order->items[i].name << " x" << order->items[i].quantity;
                if (i + 1 < order->items.size()) std::cout << ", ";
            }
            std::cout << "\n";
        }
        std::cout << "--------------------------------------------------------------\n";
    }

    /**
     * Master Kitchen Supervisor view summarizing all outlets.
     */
    void displaySupervisorOverview() const {
        std::cout << "\n==============================================================\n";
        std::cout << " [MASTER KITCHEN SUPERVISOR MONITOR] All 25 Outlets Overview\n";
        std::cout << "==============================================================\n";
        size_t totalQueued = 0;
        for (const auto& [outId, q] : outletQueues) {
            if (!q.empty()) {
                std::cout << "  • Outlet [" << std::left << std::setw(18) << outId << "] : "
                          << q.size() << " orders in prep queue\n";
                totalQueued += q.size();
            }
        }
        if (totalQueued == 0) {
            std::cout << "  (All campus kitchen queues currently clear)\n";
        }
        std::cout << " Total Active Kitchen Tickets: " << totalQueued << "\n";
        std::cout << "==============================================================\n\n";
    }
};

} // namespace CampusBites

#endif // CAMPUSBITES_KITCHENPRIORITYQUEUE_HPP
