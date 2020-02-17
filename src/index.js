// Fake "work" that is simply a task that takes as many milliseconds as its value.
const workQueue = [
  1000,
  4000,
  2000,
  4000,
  5000,
  3000,
  7000,
  1000,
  9000,
  9000,
  4000,
  2000,
  1000,
  3000,
  8000,
  2000,
  3000,
  7000,
  6000,
  30000
];

const Worker = name => channel => {
  const history = [];
  const next = () => {
    const job = channel.getWork();
    if (!job) {
      // All done!
      console.log("Worker " + name + " completed");
      return;
    }
    history.push(job);
    console.log(
      "Worker " + name + " grabbed new job:" + job + ". History is:",
      history
    );

    window.setTimeout(next, job); //job is just the milliseconds.
  };
  next();
};

const Channel = queue => {
  return {
    getWork: () => {
      return queue.pop();
    }
  };
};

let channel = Channel(workQueue);
let a = Worker("a")(channel);
let b = Worker("b")(channel);
let c = Worker("c")(channel);
let d = Worker("d")(channel);
