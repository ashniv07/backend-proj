 
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Set AWS Region (Mumbai)
const client = new DynamoDBClient({ region: "ap-south-1" });
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "Products"; 

export const handler = async (event) => {
    try {
        const params = { TableName: TABLE_NAME };
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Error fetching products" }),
        };
    }
};
