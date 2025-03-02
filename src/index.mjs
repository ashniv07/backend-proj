import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-south-1" });
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "Products";

export const handler = async (event) => {
    try {
        const { name, price, image, gender } = JSON.parse(event.body);

        if (!name || !price || !image || !gender) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields are required" }),
            };
        }

        const product = {
            productId: Date.now().toString(),
            name,
            price: Number(price),
            image,
            gender
        };

        await dynamoDB.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: product
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Product added successfully", product }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error adding product", error }),
        };
    }
};
