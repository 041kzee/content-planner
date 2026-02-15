import { NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    const profile = {
      name: body.name,
      bio: body.bio,
      type: body.type,
      followers: Number(body.followers),
      createdAt: serverTimestamp(),
    };

    const docRef =await addDoc(collection(db, "profiles" ), profile);

    return NextResponse.json({
      success: true,
      id: docRef.id
    });

  } catch (err) {
    console.error("Firestore error:", err);
    return NextResponse.json({ success: false });
  }
}