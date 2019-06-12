import React from "react";
import Parse from "parse";

const test = async () => {
  Parse.initialize("TestAppId");
  Parse.serverURL = "http://localhost:3001/api";
  Parse.liveQueryServerURL = "ws://localhost:8000/";

  const TestObject = Parse.Object.extend("Test");
  const object = new TestObject({ foo: "bar" });
  await object.save();

  const query = new Parse.Query(TestObject);
  query.equalTo("objectId", object.id);
  const subscription = await query.subscribe();

  subscription.on("update", (object, original) => {
    console.log(original.get("foo") !== object.get("foo"));
    console.log(original.toJSON());
    console.log(object.toJSON());
  });

  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
  await timeout(2000);

  object.set({ foo: "baz" });
  await object.save();
};

function App() {
  test();
  return <div className="App" />;
}

export default App;
