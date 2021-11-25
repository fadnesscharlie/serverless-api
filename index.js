'use strict';

let uuid = require('uuid').v4;
const peopleModel = require('./people.schema');

exports.handler = async (event) => {

  if(event.httpMethod === 'POST') {
    try {
      let { name } = JSON.parse(event.body);
      let id = uuid();

      let record = new peopleModel({ id, name});

      const data = await record.save();

      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      };
    };
  } else if (event.httpMethod === 'GET') {

    // Taken from Solution Code
    try {
  
      // either there is or is not an id
      const id = event.pathParameters && event.pathParameters.id;
  
      let data;
  
      if (id) {
        const list = await peopleModel.query('id').eq(id).exec();
        data = list[0];
      } else {
        data = await peopleModel.scan().exec();
      };
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
  
    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      };
    };

    // End solution Code
  } else if (event.httpMethod === 'PUT') {
    try {
      let { name } = JSON.parse(event.body);

      // If first is true, use the second one
      // if first is false, return null
      let id = event.pathParameters && event.pathParameters.id;

      let peopleUpdate;

      if(id) {
        peopleUpdate = await peopleModel.update({ 'id': id, 'name': name});
      };
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      };
    };
  } else if (event.httpMethod === 'DELETE') {
    try {

      let id = event.pathParameters && event.pathParameters.id;

      if(id) {
        await peopleModel.delete({'id': id});
      };

      return {
        statusCode: 200,
        body: 'Deleted Name'
      };
    } catch (err) {
      return {
        statusCode: 500,
        response: err.message
      };
    };
  };
};
