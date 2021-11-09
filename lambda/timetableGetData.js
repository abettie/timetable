const aws = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
	region: "ap-northeast-1"
});


exports.handler = async (event) => {
    let promises = []
    console.log(event)

    const params = {
        TableName: 'timetable',
        KeyConditionExpression: '#k = :ym',
        ExpressionAttributeNames:{
        	'#k': 'ym'
        },
        ExpressionAttributeValues:{
        	':ym': parseInt(event.ym)
        }
    };

	// DynamoDBへのGet処理実行
    promises.push(dynamoDB.query(params).promise());

    let data = [];
	await Promise.all(promises).then((d) => {
		data = d;
	}).catch((err) => {
		console.log(err);
	});
	console.log('Get data complete! ');
	console.log(data);

	const response = {
		statusCode: 200,
		body: {
			"result": "Success",
			"body": data,
			"errors": []
		}
	};
	return response;
};