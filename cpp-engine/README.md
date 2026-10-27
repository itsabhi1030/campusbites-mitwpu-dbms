# 🚀 CampusBites C++ Algorithmic Engine & DSA Architecture
**Core Computational Logic, Graph Routing & Multi-Tenant Scheduling Subsystem**

---

## 1. Executive Summary
The **CampusBites C++ Algorithmic Engine** is the high-performance computational core designed for the MIT-WPU food court delivery ecosystem. While the web interface provides a reactive presentation layer and REST API, this C++ subsystem encapsulates the mission-critical **Data Structures & Algorithms (DSA)** that drive the business logic:

1. **Autonomous Courier Fleet Routing:** Shortest path campus navigation using **Dijkstra’s Algorithm** with priority queues.
2. **Multi-Tenant Kitchen Display Scheduling:** Rush-inverted, deadline-aware order prioritization using **Min-Heaps** (`std::priority_queue` with custom comparators) with strict multi-tenant tenant isolation.
3. **Smart Autonomous Rider Dispatch:** Dynamic multi-criteria cost optimization matching ready orders to the optimal EV rider based on proximity, load balancing, and rating metrics.
4. **Order State Machine:** Object-oriented lifecycle transitions (`PLACED` → `PREPARING` → `READY_FOR_PICKUP` → `OUT_FOR_DELIVERY` → `IN_TRANSIT` → `DELIVERED`).

---

## 2. Directory Structure
```
cpp-engine/
├── Models.hpp                 # Domain Entities (Order, Rider, Outlet, Item, OrderStatus)
├── CampusGraph.hpp            # Adjacency List & Dijkstra's Shortest Path Algorithm
├── KitchenPriorityQueue.hpp   # Multi-Tenant Priority Queue (KDS Scheduler)
├── Dispatcher.hpp             # Smart Rider Allocation & Load Balancing Engine
├── CampusBitesEngine.hpp      # Central Coordinator Facade
├── main.cpp                   # Interactive CLI Console & Automated Unit Test Suite
├── campusbites_engine.exe     # Compiled Binary Executable
└── build.bat                  # One-click Windows compilation script
```

---

## 3. Data Structures & Algorithmic Complexity

| Feature / Problem | Data Structure | Algorithm | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Campus Transit Routing** | Adjacency List (`unordered_map<string, vector<Pathway>>`) | **Dijkstra's Algorithm** (with Min-Heap priority queue) | $\mathcal{O}((V + E) \log V)$ | $\mathcal{O}(V + E)$ |
| **Kitchen KDS Scheduling** | Binary Heap (`std::priority_queue`) with custom functor | **Rush-Aware SJF (Shortest Job First)** | Insertion: $\mathcal{O}(\log N)$<br>Extraction: $\mathcal{O}(\log N)$ | $\mathcal{O}(N)$ per tenant |
| **Multi-Tenant Isolation** | Hash Map (`std::unordered_map<string, Queue>`) | **Key Partitioning** by `outletId` | Lookup: $\mathcal{O}(1)$ average | $\mathcal{O}(T)$ where $T = \text{tenants}$ |
| **Rider Dispatcher** | Hash Map + Min-Cost Greedy Selector | **Multi-Criteria Optimization Function** | $\mathcal{O}(R \cdot (V+E)\log V)$ | $\mathcal{O}(R)$ |

---

## 4. Algorithmic Deep Dive

### 4.1 Dijkstra’s Shortest Path (`CampusGraph.hpp`)
* **Network Topology:** Connects the Central Food Court Hub with all key academic and administrative facilities:
  * Food Court $\leftrightarrow$ Saraswati Block (Engineering)
  * Food Court $\leftrightarrow$ Chanakya Block (Management)
  * Saraswati Block $\leftrightarrow$ Ramanujan Block (Science)
  * Chanakya Block $\leftrightarrow$ Shivaji Block $\leftrightarrow$ Peace Dome
  * Sports Complex $\leftrightarrow$ Main Gate
* **Mathematical Model:**
  $$d(v) = \min_{(u, v) \in E} \{ d(u) + w(u, v) \}$$
  Computes total distance in meters and computes precise EV transit ETA ($\approx 20\text{ km/h} = 5.5\text{ m/s}$ plus parking/handoff latency).

### 4.2 Rush-Inverted KDS Scheduling (`KitchenPriorityQueue.hpp`)
* Regular food delivery queues suffer from starvation when simple FIFO is applied to rush orders between 10-minute lecture breaks.
* The C++ engine implements a custom strict weak ordering comparator:
  1. **Strict Priority:** `isRushOrder == true` strictly supersedes non-rush tickets.
  2. **Shortest Job First (SJF):** Lower estimated preparation time is cooked first.
  3. **FIFO Tie-Breaking:** Arrival timestamp comparator breaks ties chronologically.

### 4.3 Multi-Criteria Courier Allocation (`Dispatcher.hpp`)
* When an order transitions to `READY_FOR_PICKUP`, the dispatcher evaluates all active riders using a composite cost function:
  $$\text{Cost}(R_i) = \text{Dist}(R_i.\text{Location}, \text{FoodCourt}) + (\text{ActiveDeliveries} \times 250) - (\text{Rating} \times 60)$$
* **Objective:** Minimize pickup latency while preventing rider burnout and favoring top-rated partners.

---

## 5. How to Compile and Run

### Prerequisites
* Any C++17 compliant compiler (`g++`, `clang++`, or `MSVC`).

### Option A: Run Automated Unit Tests (6/6 Checks)
```powershell
cd c:\Users\Abhishek\Documents\campusbites-system\cpp-engine
g++ -std=c++17 -O2 main.cpp -o campusbites_engine.exe
.\campusbites_engine.exe --test
```

### Option B: Launch Interactive CLI Console
```powershell
.\campusbites_engine.exe
```
This launches the interactive demonstration menu:
1. Inspect Campus Transit Graph (MIT-WPU Topology)
2. Calculate Dijkstra Shortest Delivery Path & ETA
3. Place Meal Order & Schedule in KDS Priority Queue
4. Process Kitchen Ticket & Trigger Smart Rider Dispatch
5. View Real-Time Courier Fleet Telemetry (6 Riders)
6. Run Complete End-to-End Simulation Pipeline
7. Run Automated Algorithmic Test Suite (6/6 Pass)

---

## 6. Viva Presentation & Examiner Q&A Guide

**Q1: Where is C++ used in this project?**
> *"We separated the presentation and persistence layer from the algorithmic core. While the frontend uses React and the web server uses Express, the core optimization algorithms—specifically campus transit routing (Dijkstra's algorithm), multi-tenant kitchen priority scheduling (heap data structures), and autonomous rider dispatch—are built in our C++ Algorithmic Engine."*

**Q2: What graph algorithm did you implement and why?**
> *"We implemented Dijkstra's shortest path algorithm using an adjacency list and a min-heap priority queue (`std::priority_queue`). It allows us to calculate the exact optimal delivery path and EV scooter transit time between the central food court and any academic block (Saraswati, Chanakya, Shivaji, Ramanujan, Peace Dome) in $\mathcal{O}((V+E)\log V)$ time."*

**Q3: How do you handle order prioritization in the kitchen?**
> *"Instead of simple FIFO which causes bottlenecking during rush periods, we built a rush-aware Priority Queue using a custom comparator. Orders flagged as 'rush' (students ordering during short lecture breaks) are dynamically promoted up the heap, followed by Shortest-Job-First (SJF) prep times, while keeping queues strictly isolated per outlet for multi-tenancy."*

**Q4: How does rider allocation work?**
> *"The dispatcher runs a multi-criteria greedy cost optimization algorithm. It calculates the network distance from the rider's current building to the Food Court, penalizes active delivery loads for load balancing, and rewards higher-rated drivers to pick the optimal delivery partner."*
