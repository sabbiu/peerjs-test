import React, { useEffect } from "react";
import Automerge from "automerge";

export function useAutomerge(initialDoc) {
  const [doc, setDoc] = React.useState(() =>
    Automerge.from(typeof initialDoc === "function" ? initialDoc() : initialDoc)
  );

  return [
    doc,
    React.useCallback(
      (message) => {
        setDoc(Automerge.change(doc, message));
      },
      [doc]
    ),
    setDoc,
  ];
}
