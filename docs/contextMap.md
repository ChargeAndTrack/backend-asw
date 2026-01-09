```mermaid
flowchart TB
    subgraph user context
    user --- role
    end

    subgraph map context
    map --- place
    end

    subgraph electric vehicles context
    chargingStation --- car
    end

    place --- chargingStation
    user --- car
```