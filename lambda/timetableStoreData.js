const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
	region: "ap-northeast-1"
});


exports.handler = async (event) => {
	let promises = [];
    console.log(event)
	
	if (event.ymd == null) {
		console.log('parameter error!');
		return false;
	}

	const params = {
		TableName: "timetable",
		Item: {
			"ym": Math.trunc(event.ymd / 100),
			"ymd": event.ymd,
			"inTime": event.inTime,
			"outTime": event.outTime,
			"notice": event.notice
		}
	};

	// DynamoDBへのPut処理実行
	promises.push(dynamoDB.put(params).promise());
	
	await Promise.all(promises).then((d) => {
		// console.log(d);
	}).catch((err) => {
		console.log(err);
	});
	console.log('Store data complete! ' + event.ymd);

	const response = {
		statusCode: 200,
		body: {
			"result": "Success",
			"errors": []
		}
	};
	return response;
};