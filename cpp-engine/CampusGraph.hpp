#ifndef CAMPUSBITES_CAMPUSGRAPH_HPP
#define CAMPUSBITES_CAMPUSGRAPH_HPP

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <queue>
#include <algorithm>
#include <limits>
#include <iomanip>

namespace CampusBites {

/**
 * Edge representing an inter-building pathway on campus.
 */
struct Pathway {
    std::string destination;
    double distanceMeters;     // Distance in meters
    double transitMinutes;     // Estimated transit time for EV scooter

    Pathway(std::string dest, double distMeters, double speedMps = 5.5) // ~20 km/h ~ 5.5 m/s
        : destination(std::move(dest)), distanceMeters(distMeters) {
        // Transit minutes = (distance / speed) in minutes + 1.0 min pickup/dropoff buffer
        transitMinutes = (distMeters / (speedMps * 60.0)) + 1.0;
    }
};

/**
 * Result structure returned by Dijkstra's shortest path routing algorithm.
 */
struct RouteResult {
    bool found;
    std::string origin;
    std::string destination;
    double totalDistanceMeters;
    double estimatedTransitMinutes;
    std::vector<std::string> path;
};

/**
 * MIT-WPU Campus Transit Graph.
 * Implements Dijkstra's Algorithm with a priority queue (Min-Heap) for optimal meal dispatch.
 */
class CampusGraph {
private:
    std::unordered_map<std::string, std::vector<Pathway>> adjacencyList;

public:
    CampusGraph() {
        buildDefaultMitWpuMap();
    }

    /**
     * Adds a bidirectional pathway between two campus buildings.
     */
    void addPathway(const std::string& from, const std::string& to, double distanceMeters) {
        adjacencyList[from].emplace_back(to, distanceMeters);
        adjacencyList[to].emplace_back(from, distanceMeters);
    }

    /**
     * Builds the topological map of the MIT-WPU campus network.
     */
    void buildDefaultMitWpuMap() {
        adjacencyList.clear();

        // Pathways connecting Central Food Court and Academic Blocks
        addPathway("Food Court", "Saraswati Block", 280.0);
        addPathway("Food Court", "Chanakya Block", 350.0);
        addPathway("Food Court", "Main Gate", 200.0);

        addPathway("Saraswati Block", "Ramanujan Block", 220.0);
        addPathway("Saraswati Block", "Sports Complex", 400.0);

        addPathway("Chanakya Block", "Shivaji Block", 260.0);
        addPathway("Chanakya Block", "Peace Dome", 450.0);

        addPathway("Shivaji Block", "Main Gate", 180.0);
        addPathway("Shivaji Block", "Peace Dome", 320.0);

        addPathway("Ramanujan Block", "Sports Complex", 300.0);
        addPathway("Sports Complex", "Peace Dome", 500.0);
    }

    /**
     * Executes Dijkstra's Algorithm to determine the shortest delivery path and ETA.
     * Time Complexity: O((V + E) * log(V)) using std::priority_queue.
     */
    RouteResult findShortestRoute(const std::string& startNode, const std::string& endNode) const {
        RouteResult result;
        result.origin = startNode;
        result.destination = endNode;
        result.found = false;
        result.totalDistanceMeters = 0.0;
        result.estimatedTransitMinutes = 0.0;

        if (startNode == endNode) {
            result.found = true;
            result.path = { startNode };
            result.estimatedTransitMinutes = 1.0;
            return result;
        }

        if (adjacencyList.find(startNode) == adjacencyList.end() ||
            adjacencyList.find(endNode) == adjacencyList.end()) {
            return result;
        }

        // Min-heap storing pair<Distance, NodeName>
        using QueueElement = std::pair<double, std::string>;
        std::priority_queue<QueueElement, std::vector<QueueElement>, std::greater<QueueElement>> pq;

        std::unordered_map<std::string, double> distances;
        std::unordered_map<std::string, std::string> previousNode;

        for (const auto& pair : adjacencyList) {
            distances[pair.first] = std::numeric_limits<double>::infinity();
        }

        distances[startNode] = 0.0;
        pq.push({0.0, startNode});

        while (!pq.empty()) {
            auto [currentDist, u] = pq.top();
            pq.pop();

            if (currentDist > distances[u]) continue;
            if (u == endNode) break;

            auto it = adjacencyList.find(u);
            if (it == adjacencyList.end()) continue;

            for (const auto& edge : it->second) {
                double newDist = currentDist + edge.distanceMeters;
                if (newDist < distances[edge.destination]) {
                    distances[edge.destination] = newDist;
                    previousNode[edge.destination] = u;
                    pq.push({newDist, edge.destination});
                }
            }
        }

        if (distances[endNode] == std::numeric_limits<double>::infinity()) {
            return result; // No path found
        }

        // Reconstruct path backwards
        std::vector<std::string> reconstructedPath;
        std::string curr = endNode;
        while (!curr.empty()) {
            reconstructedPath.push_back(curr);
            if (curr == startNode) break;
            curr = previousNode[curr];
        }
        std::reverse(reconstructedPath.begin(), reconstructedPath.end());

        result.found = true;
        result.path = reconstructedPath;
        result.totalDistanceMeters = distances[endNode];
        // Calculate ETA assuming 5.5 m/s (~20 km/h) EV scooter speed + 2 min pickup/handoff buffer
        result.estimatedTransitMinutes = (distances[endNode] / (5.5 * 60.0)) + 2.0;

        return result;
    }

    /**
     * Prints the campus graph topology.
     */
    void printTopology() const {
        std::cout << "\n======================================================\n";
        std::cout << "  MIT-WPU CAMPUS TOPOLOGY (TRANSIT ADJACENCY GRAPH)\n";
        std::cout << "======================================================\n";
        for (const auto& [node, pathways] : adjacencyList) {
            std::cout << " [Building] " << std::left << std::setw(18) << node << " -> ";
            for (size_t i = 0; i < pathways.size(); ++i) {
                std::cout << pathways[i].destination << " (" << pathways[i].distanceMeters << "m)";
                if (i + 1 < pathways.size()) std::cout << ", ";
            }
            std::cout << "\n";
        }
        std::cout << "======================================================\n\n";
    }

    std::vector<std::string> getAllBuildings() const {
        std::vector<std::string> buildings;
        for (const auto& [name, _] : adjacencyList) {
            buildings.push_back(name);
        }
        return buildings;
    }
};

} // namespace CampusBites

#endif // CAMPUSBITES_CAMPUSGRAPH_HPP
