pragma solidity ^0.8.0;

contract ProductTracker {
    enum UserRole {
        Manufacturer,
        Retailer,
        Consumer
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string location;
        uint256 timestamp;
    }

    mapping(address => UserRole) public userRoles;
    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event NewProduct(
        uint256 id,
        string name,
        uint256 price,
        string location,
        uint256 timestamp
    );
    event ProductLocationUpdate(uint256 id, string newLocation);

    function addProduct(string memory _name, uint _price, string memory _location) public {
        require(userRoles[msg.sender] == UserRole.Manufacturer, "Unauthorized");

        productCount++;
        products[productCount] = Product(productCount, _name, _price, _location, block.timestamp);
        emit NewProduct(productCount, _name, _price, _location, block.timestamp);
    }

    function updateProductLocation(uint256 _id, string memory _location)
        public
        payable
    {
        require(userRoles[msg.sender] == UserRole.Retailer, "Unauthorized");

        products[_id].location = _location;
        emit ProductLocationUpdate(_id, _location);
    }

    function getProduct(uint256 _id)
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        return (
            products[_id].id,
            products[_id].name,
            products[_id].price,
            products[_id].location,
            products[_id].timestamp
        );
    }

    function setUserRole(address _user, UserRole _role) public {
        require(userRoles[msg.sender] == UserRole.Manufacturer, "Unauthorized");
        userRoles[_user] = _role;
    }
}
