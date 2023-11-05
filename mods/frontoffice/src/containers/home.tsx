import * as SDK from "@goodtok/sdk";
import { HomePage } from "~components/home/HomePage";
import { useAuth } from "~authentication";
import React, { useEffect } from "react";

function HomeContainer() {
  const [name, setName] = React.useState("");
  const [workspaces, setWorkspaces] = React.useState<
    Array<{
      id: string;
      name: string;
      createdAt: Date;
    }>
  >([]);

  const { client, signOut, isSignedIn } = useAuth();

  if (!client) {
    signOut();
    return;
  }

  useEffect(() => {
    setName("John Doe");
  });

  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    const workspaces = new SDK.Workspaces(client);

    workspaces
      .getWorkspaces()
      .then((res) => {
        const workspacesList = res.map((wp) => {
          return {
            id: wp.id,
            name: wp.name,
            // TODO: Fix this
            createdAt: new Date()
          };
        });
        setWorkspaces(workspacesList);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [client]);

  const handleWorkspaceSelect = (id?: string) => {
    if (!id) {
      window.location.href = "/new-workspace";
      return;
    }
    window.location.href = `/workspace/${id}`;
  };

  return (
    <HomePage
      isAuthenticated={true}
      userName={name}
      workspaces={workspaces}
      onWorkspaceSelect={handleWorkspaceSelect}
      onSignOut={signOut}
    />
  );
}

export default HomeContainer;
