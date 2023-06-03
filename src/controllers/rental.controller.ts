import "reflect-metadata";
import { autoInjectable, container } from "tsyringe";
import RentalService from "../services/rental.service";
import BaseController from "./base.controller";
import { RentalSchemaValidation } from "../models/rental.model";
import CarService from "../services/car.service";
import UserService from "../services/user.service";
import NotFoundError from "../errors/NotFoundError";

@autoInjectable()
export default class RentalController extends BaseController {
  service: RentalService;
  constructor(
    service?: RentalService,
    schemaValidation?: RentalSchemaValidation
  ) {
    super(service, schemaValidation);
  }

  post = async (req: any, res: any) => {
    const { body } = req;

    this.schemaValidation.validate(body);

    const { carId, userId, start, end } = body;

    const carService = container.resolve(CarService) as CarService;

    const car = await carService.getById(carId);
    if (!car) {
      throw new NotFoundError("No car found");
    }

    const userService = container.resolve(UserService) as UserService;

    const user = await userService.getById(userId);
    if (!user) {
      throw new NotFoundError("No user found");
    }

    // the problem here: between the time we check if the car is available and the time we create the rental, another rental can be created
    // and even if we make an index by start and end times and insert the rental first, we can still have a problem if another user tries to create another rental
    // at different times that overlap with the first rental
    // so we need to use message queues to make sure that the rentals are created in the right order
    // and with message queues we will have problem that all request will be in the same queue and we will have a bottleneck
    // so for this problem we can use a distributed message queues and distribute the requests between the queues by carIds
    // every carId will be in a specific queue and the requests for this carId will be in this queue
    // we can implement it with load balancer. ex: every carId from 1 to 100 will be in queue 1, from 101 to 200 will be in queue 2, etc...
    //(if we use here array instead of db and assume that there are no another instance of the server we can
    // use a lock (mutex) to make sure that the rentals are created in the right order)

    if (!(await this.service.isCarAvailable(carId, start, end))) {
      throw new NotFoundError("Car is not available at these dates");
    }

    const resource = await this.service.post(body);

    res.send(resource);
  };
}
