import connectDB from "../../../config/page";
import Popost from "../../../models/page";
await connectDB();

export async function GET() {
  try {
    await connectDB();

    const data = await Popost.find();

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 

export async function POST(req) {
    const data = await req.json();
    const toput = await Popost.create(data)
    await toput.save();
    return Response.json({
        message: "done"
    });
}