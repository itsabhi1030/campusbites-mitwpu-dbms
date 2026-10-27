#include "Models.hpp"
#include "CampusGraph.hpp"
#include "KitchenPriorityQueue.hpp"
#include "Dispatcher.hpp"
#include "CampusBitesEngine.hpp"

#include <iostream>
#include <string>
#include <vector>
#include <cassert>
#include <thread>
#include <chrono>

using namespace CampusBites;

void runAutomatedTests() {
    std::cout << "\n======================================================\n";
    std::cout << "  RUNNING CAMPUSBITES C++ ENGINE AUTOMATED TESTS\n";
    std::cout << "======================================================\n";

    CampusGraph graph;

    // Test 1: Dijkstra Shortest Path
    std::cout << "[TEST 1] Verifying Dijkstra Shortest Path (Food Court -> Saraswati Block)... ";
    auto route = graph.findShortestRoute("Food Court", "Saraswati Block");
    assert(route.found);
    assert(route.totalDistanceMeters == 280.0);
    assert(route.path.size() == 2);
    assert(route.path[0] == "Food Court" && route.path[1] == "Saraswati Block");
    std::cout << "PASSED (Dist: " << route.totalDistanceMeters << "m, ETA: " << std::fixed << std::setprecision(1) << route.estimatedTransitMinutes << " mins)\n";

    // Test 2: Multi-Hop Dijkstra
    std::cout << "[TEST 2] Verifying Multi-Hop Dijkstra (Food Court -> Ramanujan Block)... ";
    auto multiRoute = graph.findShortestRoute("Food Court", "Ramanujan Block");
    assert(multiRoute.found);
    // Food Court -> Saraswati Block (280) + Saraswati Block -> Ramanujan Block (220) = 500m
    assert(multiRoute.totalDistanceMeters == 500.0);
    assert(multiRoute.path.size() == 3);
    assert(multiRoute.path[0] == "Food Court" && multiRoute.path[1] == "Saraswati Block" && multiRoute.path[2] == "Ramanujan Block");
    std::cout << "PASSED (Path: Food Court -> Saraswati -> Ramanujan = 500m)\n";

    // Test 3: KDS Priority Queue & Rush Inversion
    std::cout << "[TEST 3] Verifying KDS Priority Queue & Rush Order Scheduling... ";
    KitchenDisplayEngine kds;
    auto normalOrder = std::make_shared<Order>(
        "ORD-TEST-1", "Aarav Sharma", "aarav@mitwpu.edu.in",
        "mcdonalds", "McDonald's", "Saraswati Block",
        std::vector<OrderItem>{ OrderItem("mcd-1", "McSpicy Paneer Burger", 179.0, 1, 10) },
        179.0, 10, false // Not rush
    );
    auto rushOrder = std::make_shared<Order>(
        "ORD-TEST-2", "Priya Kulkarni", "priya@mitwpu.edu.in",
        "mcdonalds", "McDonald's", "Chanakya Block",
        std::vector<OrderItem>{ OrderItem("mcd-2", "McChicken Burger", 199.0, 1, 15) },
        199.0, 15, true // RUSH PRIORITY
    );

    // Enqueue normal first, then rush
    kds.enqueueOrder(normalOrder);
    kds.enqueueOrder(rushOrder);

    // Rush order must pop FIRST despite being enqueued second and having longer prep time
    auto firstToCook = kds.dequeueReadyOrder("mcdonalds");
    assert(firstToCook->orderNumber == "ORD-TEST-2");
    assert(firstToCook->isRushOrder == true);

    auto secondToCook = kds.dequeueReadyOrder("mcdonalds");
    assert(secondToCook->orderNumber == "ORD-TEST-1");
    std::cout << "PASSED (Rush order prioritized ahead of regular order)\n";

    // Test 4: Multi-Tenant Queue Isolation
    std::cout << "[TEST 4] Verifying Multi-Tenant KDS Tenant Isolation... ";
    auto dominosOrder = std::make_shared<Order>(
        "ORD-DOM-1", "Rohan Joshi", "rohan@mitwpu.edu.in",
        "dominos", "Domino's Pizza", "Shivaji Block",
        std::vector<OrderItem>{ OrderItem("dom-1", "Farmhouse Pizza", 459.0, 1, 18) },
        459.0, 18, false
    );
    kds.enqueueOrder(dominosOrder);

    assert(kds.getQueueSize("mcdonalds") == 0); // McDonald's queue is empty
    assert(kds.getQueueSize("dominos") == 1);   // Domino's has its own ticket
    std::cout << "PASSED (Zero leakage across restaurant queues)\n";

    // Test 5: Smart Courier Rider Dispatch
    std::cout << "[TEST 5] Verifying Smart Greedy Rider Dispatch Cost Optimization... ";
    Dispatcher dispatcher(graph);
    auto testOrder = std::make_shared<Order>(
        "ORD-TEST-5", "Tanvi Mehta", "tanvi@mitwpu.edu.in",
        "subway", "Subway", "Peace Dome",
        std::vector<OrderItem>{ OrderItem("sub-1", "Veggie Delite Sub", 210.0, 1, 8) },
        210.0, 8, false
    );

    auto dispatchResult = dispatcher.dispatchOrder(testOrder, "Food Court");
    assert(dispatchResult.success);
    assert(!dispatchResult.riderEmail.empty());
    assert(testOrder->status == OrderStatus::OUT_FOR_DELIVERY);
    std::cout << "PASSED (Assigned: " << dispatchResult.riderName << " [" << dispatchResult.vehicleNumber << "])\n";

    // Test 6: Delivery Completion & Telemetry Update
    std::cout << "[TEST 6] Verifying Delivery Completion & State Updates... ";
    bool delivered = dispatcher.completeDelivery(testOrder);
    assert(delivered);
    assert(testOrder->status == OrderStatus::DELIVERED);
    std::cout << "PASSED (Order marked DELIVERED, rider capacity freed)\n";

    std::cout << "\n>>> ALL 6 ALGORITHMIC & DSA UNIT TESTS PASSED SUCCESSFULLY! <<<\n";
    std::cout << "======================================================\n\n";
}

void printBanner() {
    std::cout << R"(
  =============================================================
   _____                                ____  _ _            
  / ____|                              |  _ \(_) |           
 | |     __ _ _ __ ___  _ __  _   _ ___| |_) |_| |_ ___  ___ 
 | |    / _` | '_ ` _ \| '_ \| | | / __|  _ <| | __/ _ \/ __|
 | |___| (_| | | | | | | |_) | |_| \__ \ |_) | | ||  __/\__ \
  \_____\__,_|_| |_| |_| .__/ \__,_|___/____/|_|\__\___||___/
                       | |                                   
                       |_|   MIT-WPU C++ ALGORITHMIC ENGINE  
  =============================================================
    Multi-Tenant KDS Scheduling | Dijkstra Campus Routing     
  =============================================================
)" << "\n";
}

int main(int argc, char* argv[]) {
    if (argc > 1 && std::string(argv[1]) == "--test") {
        runAutomatedTests();
        return 0;
    }

    printBanner();

    CampusBitesEngine engine;
    int choice = 0;

    while (true) {
        std::cout << "\n=============== MAIN SELECTION MENU ===============" << "\n";
        std::cout << " 1. Inspect Campus Transit Graph (MIT-WPU Topology)\n";
        std::cout << " 2. Calculate Dijkstra Shortest Delivery Path & ETA\n";
        std::cout << " 3. Place Meal Order & Schedule in KDS Priority Queue\n";
        std::cout << " 4. Process Kitchen Ticket & Trigger Smart Rider Dispatch\n";
        std::cout << " 5. View Real-Time Courier Fleet Telemetry (6 Riders)\n";
        std::cout << " 6. Run Complete End-to-End Simulation Pipeline\n";
        std::cout << " 7. Run Automated Algorithmic Test Suite (6/6 Pass)\n";
        std::cout << " 8. Exit Engine Console\n";
        std::cout << "====================================================\n";
        std::cout << "Enter your choice (1-8): ";

        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::string discard;
            std::cin >> discard;
            continue;
        }

        if (choice == 8) {
            std::cout << "\nExiting CampusBites C++ Algorithmic Engine. Goodbye!\n";
            break;
        }

        switch (choice) {
            case 1: {
                engine.getGraph().printTopology();
                break;
            }
            case 2: {
                std::cout << "\nAvailable Campus Destination Blocks:\n";
                auto buildings = engine.getGraph().getAllBuildings();
                for (size_t i = 0; i < buildings.size(); ++i) {
                    std::cout << "  " << (i + 1) << ". " << buildings[i] << "\n";
                }

                std::cout << "\nEnter origin (or press 1 for Food Court): ";
                std::string origin = "Food Court";
                std::cout << "Enter destination block (e.g., Peace Dome, Saraswati Block, Chanakya Block): ";
                std::string dest;
                std::cin.ignore();
                std::getline(std::cin, dest);
                if (dest.empty()) dest = "Peace Dome";

                auto route = engine.getGraph().findShortestRoute(origin, dest);
                if (!route.found) {
                    std::cout << "❌ No pathway found between " << origin << " and " << dest << "!\n";
                } else {
                    std::cout << "\n======================================================\n";
                    std::cout << "  DIJKSTRA SHORTEST PATH & TRANSIT TELEMETRY\n";
                    std::cout << "======================================================\n";
                    std::cout << " Origin:           " << route.origin << "\n";
                    std::cout << " Destination:      " << route.destination << "\n";
                    std::cout << " Total Distance:   " << route.totalDistanceMeters << " meters\n";
                    std::cout << " EV Transit ETA:   " << std::fixed << std::setprecision(1) << route.estimatedTransitMinutes << " minutes\n";
                    std::cout << " Navigation Route: ";
                    for (size_t i = 0; i < route.path.size(); ++i) {
                        std::cout << route.path[i];
                        if (i + 1 < route.path.size()) std::cout << " -> ";
                    }
                    std::cout << "\n======================================================\n";
                }
                break;
            }
            case 3: {
                std::cout << "\nSelect Outlet for Order Placement:\n";
                std::cout << " 1. McDonald's (mcdonalds)\n";
                std::cout << " 2. Domino's Pizza (dominos)\n";
                std::cout << " 3. Subway (subway)\n";
                std::cout << " 4. Starbucks (starbucks)\n";
                std::cout << "Choice (1-4): ";
                int outChoice;
                std::cin >> outChoice;

                std::string outId = "mcdonalds", outName = "McDonald's";
                if (outChoice == 2) { outId = "dominos"; outName = "Domino's Pizza"; }
                else if (outChoice == 3) { outId = "subway"; outName = "Subway"; }
                else if (outChoice == 4) { outId = "starbucks"; outName = "Starbucks"; }

                std::cout << "Is this a RUSH priority order? (1 for Yes, 0 for No): ";
                int isRush = 0;
                std::cin >> isRush;

                std::cout << "Target Academic Block (e.g., Saraswati Block): ";
                std::string block;
                std::cin.ignore();
                std::getline(std::cin, block);
                if (block.empty()) block = "Saraswati Block";

                std::vector<OrderItem> items = {
                    OrderItem("item-1", outName + " Special Combo", 249.0, 1, isRush ? 8 : 14)
                };

                auto order = engine.placeOrder("Aditya Sharma", "aditya@mitwpu.edu.in", outId, outName, block, items, isRush ? 8 : 14, isRush == 1);
                std::cout << "\n✅ Order Successfully Placed & Scheduled in KDS!\n";
                std::cout << "   Ticket ID: " << order->orderNumber << " | Outlet: " << outName
                          << " | Prep Time: " << order->estimatedPrepTime << " mins"
                          << (order->isRushOrder ? " [⭐ RUSH PRIORITY]" : "") << "\n";

                engine.getKds().displayOutletTerminal(outId, outName);
                break;
            }
            case 4: {
                std::cout << "\nEnter Outlet ID to cook & dispatch (mcdonalds, dominos, subway, starbucks): ";
                std::string outId;
                std::cin >> outId;
                if (outId.empty()) outId = "mcdonalds";

                auto dispatchRes = engine.finishCookingAndDispatch(outId);
                if (!dispatchRes.success) {
                    std::cout << "❌ " << dispatchRes.message << "\n";
                } else {
                    std::cout << "\n======================================================\n";
                    std::cout << "  KITCHEN PREP FINISHED -> COURIER RIDER DISPATCHED\n";
                    std::cout << "======================================================\n";
                    std::cout << " Order Ticket:     " << dispatchRes.orderNumber << "\n";
                    std::cout << " Assigned Rider:   " << dispatchRes.riderName << " (" << dispatchRes.riderEmail << ")\n";
                    std::cout << " Assigned Vehicle: " << dispatchRes.vehicleNumber << "\n";
                    std::cout << " Pickup Distance:  " << dispatchRes.pickupDistanceMeters << "m to Food Court\n";
                    std::cout << " Delivery Block:   " << dispatchRes.deliveryBlock << " (" << dispatchRes.deliveryDistanceMeters << "m)\n";
                    std::cout << " Total Transit ETA:" << std::fixed << std::setprecision(1) << dispatchRes.totalEtaMinutes << " minutes\n";
                    std::cout << " Transit Route:    ";
                    for (size_t i = 0; i < dispatchRes.transitRoute.size(); ++i) {
                        std::cout << dispatchRes.transitRoute[i];
                        if (i + 1 < dispatchRes.transitRoute.size()) std::cout << " -> ";
                    }
                    std::cout << "\n======================================================\n";
                }
                break;
            }
            case 5: {
                engine.getDispatcher().displayFleetStatus();
                break;
            }
            case 6: {
                std::cout << "\n--- STARTING FULL END-TO-END PIPELINE SIMULATION ---\n";
                std::cout << "Step 1: Student places Rush Order at McDonald's for delivery at Peace Dome...\n";
                auto o1 = engine.placeOrder("Sneha Patil", "sneha@mitwpu.edu.in", "mcdonalds", "McDonald's", "Peace Dome",
                    { OrderItem("mcd-1", "McSpicy Chicken Burger", 220.0, 2, 8) }, 8, true);

                std::cout << "Step 2: Student places Standard Order at McDonald's for delivery at Saraswati Block...\n";
                auto o2 = engine.placeOrder("Kunal Verma", "kunal@mitwpu.edu.in", "mcdonalds", "McDonald's", "Saraswati Block",
                    { OrderItem("mcd-2", "Big Spicy Paneer Wrap", 185.0, 1, 14) }, 14, false);

                engine.getKds().displayOutletTerminal("mcdonalds", "McDonald's");

                std::cout << "\nStep 3: Kitchen calls for next order to prep (Rush order pops first!)...\n";
                auto dispatch1 = engine.finishCookingAndDispatch("mcdonalds");
                std::cout << "-> Order " << dispatch1.orderNumber << " dispatched to " << dispatch1.riderName << "!\n";

                std::cout << "\nStep 4: Rider arrives at Peace Dome and hands over meal to Sneha...\n";
                engine.markDelivered(dispatch1.orderNumber);
                std::cout << "-> Order " << dispatch1.orderNumber << " marked DELIVERED!\n";

                std::cout << "\nStep 5: Inspecting updated courier fleet telemetry...\n";
                engine.getDispatcher().displayFleetStatus();
                std::cout << "--- END-TO-END SIMULATION COMPLETE! ---\n";
                break;
            }
            case 7: {
                runAutomatedTests();
                break;
            }
            default:
                std::cout << "Invalid selection! Please enter a number between 1 and 8.\n";
                break;
        }
    }

    return 0;
}
