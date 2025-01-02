import {
  getCashbackHistoryCustomerService,
  getCustomerService,
  getCustomersService,
  updateCashbackCustomerService,
  updateCustomerService,
} from "../../services/customer/customerService.js";
import {
  cashbackSchema,
  updateCustomerSchema,
} from "./entities/dto/customer.dto.js";
// customer access
export const getCustomer = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const customer = await getCustomerService(customerId);
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const updateCustomer = async (req, res, next) => {
  try {
    const validatedData = updateCustomerSchema.parse(req.body);
    const customerId = req.user.id;
    await updateCustomerService(customerId, validatedData);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// admin access
export const getCustomerFromAdmin = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerService(customerId);
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getCustomersFromAdmin = async (req, res, next) => {
  try {
    const customers = await getCustomersService();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const updateCustomerFromAdmin = async (req, res, next) => {
  try {
    const validatedData = updateCustomerSchema.parse(req.body);
    const customerId = req.params.customerId;
    await updateCustomerService(customerId, validatedData);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getCashbackHistoryCustomerFromAdmin = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const cashbackHistory = await getCashbackHistoryCustomerService(customerId);
    res.status(200).json(cashbackHistory);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const updateCashbackCustomer = async (req, res, next) => {
  try {
    const validatedData = cashbackSchema.parse(req.body);
    const customerId = req.params.customerId;
    await updateCashbackCustomerService(customerId, validatedData);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
