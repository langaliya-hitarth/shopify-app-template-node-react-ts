export interface ICommand {
  run(): Promise<void>;
}
