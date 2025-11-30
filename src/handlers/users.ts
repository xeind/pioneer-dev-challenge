import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../types/response";

export function getUsers(request: Request, response: Response) {
  response.send([]);
}

export function getUsersById(request: Request, response: Response) {
  response.send({});
}

export function createUser(
  request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  response: Response<User>,
) {
  return response.status(201).send({
    id: 1,
    username: "",
    email: "hello@guys.com",
  });
}
