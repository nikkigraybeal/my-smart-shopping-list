import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { getUser } from '../../utils/utils';
import Nav from '../Nav/Nav';
import { onSnapshot } from 'firebase/firestore';
import './AddItem.css';

export default function AddItem() {
  const [userToken] = useState(getUser());
  const [itemName, setItemName] = useState('');
  const [frequency, setFrequency] = useState(7);
  const [message, setMessage] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, userToken), (snapshot) => {
      let snapshotDocs = [];
      snapshot.forEach((doc) => snapshotDocs.push(doc));
      setDocs(snapshotDocs);
    });
    return () => {
      unsubscribe();
    };
  }, [userToken]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const cleanStringHandler = (item) => {
      return item
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
    };

    const cleanList = docs.map((listItem) =>
      cleanStringHandler(listItem.data().item),
    );

    const cleanItemName = cleanStringHandler(itemName);

    try {
      if (cleanList.includes(cleanItemName)) {
        setMessage(`${cleanItemName} is already included in the list.`);
        throw Error(`${cleanItemName} is already included in the list.`);
      }
      const docRef = await addDoc(collection(db, userToken), {
        item: itemName,
        frequency: frequency,
        lastPurchaseDate: null,
        dateItemAdded: Timestamp.now().seconds,
        estimatedPurchaseInterval: null,
        totalPurchases: 0,
      });
      console.log(docRef.id);
      setMessage(`${itemName} added to the list successfully.`);
    } catch (e) {
      console.error(e);
    }
    setItemName('');
    setFrequency(7);
  };

  return (
    <>
      <div className="item-container">
        <h1 className="add-title">Add Item</h1>
        <form className="form" onSubmit={submitHandler}>
          {/* <label htmlFor="item-name">Item name:</label> */}
          <input
            placeholder=" Enter item name..."
            className="search-input"
            required
            id="item-name"
            type="text"
            name="item-name"
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
          />

          <p className="add-item-p-tag">How soon will you buy this again?</p>

          <div className="frequency">
            <label htmlFor="soon">Soon</label>
            <input
              defaultChecked
              id="soon"
              type="radio"
              name="frequency"
              value={7}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>

          <div className="frequency">
            <label htmlFor="kind-of-soon">Kind of Soon</label>
            <input
              id="kind-of-soon"
              type="radio"
              name="frequency"
              value={14}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>

          <div className="frequency">
            <label htmlFor="not-soon">Not Soon</label>
            <input
              id="not-soon"
              type="radio"
              name="frequency"
              value={30}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </div>

          <button type="submit" className="add-item-button">
            Add Item
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <Nav />
    </>
  );
}
