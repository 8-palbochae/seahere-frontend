const inventoryMockup = {
    products: [
        {
            productId: 1,
            productName: "Apple",
            country: "USA",
            category: "Fruit",
            natural: "Yes",
            totalQuantity: 100,
            page: 1,
            size: 10,
            totalPage: 1,
            totalCount: 1,
            latestIncoming: "2023-07-20",
            detailData: [
                {
                    inventoryId: 101,
                    inventoryQuantity: 50,
                    price: 1000,
                    date: "2023-07-10"
                },
                {
                    inventoryId: 102,
                    inventoryQuantity: 50,
                    price: 1000,
                    date: "2023-07-15"
                }
            ]
        },
        {
            productId: 2,
            productName: "Orange",
            country: "Spain",
            category: "Fruit",
            natural: "Yes",
            totalQuantity: 150,
            page: 1,
            size: 10,
            totalPage: 1,
            totalCount: 1,
            latestIncoming: "2023-07-22",
            detailData: [
                {
                    inventoryId: 201,
                    inventoryQuantity: 75,
                    price: 800,
                    date: "2023-07-12"
                },
                {
                    inventoryId: 202,
                    inventoryQuantity: 75,
                    price: 800,
                    date: "2023-07-18"
                }
            ]
        },
        {
            productId: 3,
            productName: "Banana",
            country: "Ecuador",
            category: "Fruit",
            natural: "Yes",
            totalQuantity: 200,
            page: 1,
            size: 10,
            totalPage: 1,
            totalCount: 1,
            latestIncoming: "2023-07-25",
            detailData: [
                {
                    inventoryId: 301,
                    inventoryQuantity: 100,
                    price: 500,
                    date: "2023-07-15"
                },
                {
                    inventoryId: 302,
                    inventoryQuantity: 100,
                    price: 500,
                    date: "2023-07-20"
                }
            ]
        }
    ]
};

export default inventoryMockup;
