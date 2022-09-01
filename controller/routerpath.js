const _ = require("lodash");
const Schema = require("../model/studentCatalog");

const studentcontroller = {
  getAll: async (ctx) => {
    try {
      const student = await Schema.find();
      ctx.response.status = 200;
      ctx.body = student;
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = error.message;
    }
  },
  create: async (ctx) => {
    try {
      const newEmployee = new Schema(ctx.request.body);
      const result = await newEmployee.save();
      ctx.response.status = 201;
      ctx.body = result;
    } catch (error) {
      ctx.response.status = 422;
      ctx.body = error.message;
    }
  },
  getById: async (ctx) => {
    try {
      const employee = await Schema.findById(ctx.request.params.id);
      ctx.response.status = 200;
      ctx.body = employee;
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = error.message;
    }
  },
  updateStudent: async (ctx) => {
    try {
      const updatedEmployee = await Schema.findByIdAndUpdate(
        ctx.request.params.id,
        ctx.request.body,
        { new: true }
      );
      ctx.response.status = 200;
      ctx.body = await updatedEmployee;
    } catch (error) {
      ctx.response.status = 422;
      ctx.body = error.message;
    }
  },
  removeStudent: async (ctx) => {
    try {
      await Schema.findByIdAndDelete(ctx.request.params.id);
      ctx.response.status = 200;
      ctx.body = "Employee removed";
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = error.message;
    }
  },
};

module.exports = studentcontroller;