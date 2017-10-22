function Parking(id, name, description, address, totalCapacity, availableCapacity, open) {
    this.id = id;

    this.name = name;
    this.description = description;
    this.address = address;
    
    this.totalCapacity = totalCapacity;
    this.availableCapacity = availableCapacity;

    this.open = open;
}