import { singleton } from "tsyringe";
import { LoggerI } from "../interfaces/logs.interface";

@singleton()
class ConsoleLogger implements LoggerI {
  error = (message: string) => {
    console.error(message);
  };
  info = (message: string) => {
    console.log(message);
  };
}

export default ConsoleLogger;
