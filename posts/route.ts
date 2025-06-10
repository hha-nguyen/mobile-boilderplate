import {getAccessToken} from '../../backend-boilderplate/src/lib/auth';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '../../backend-boilderplate/src/lib/db';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  authorId: z.string().optional(),
});

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const token = getAccessToken(request);
  if (!token) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization token' },
      { status: 401 }
    );
  }

  const posts = await db.post.findMany();

  return Response.json(posts);
}

export async function POST(request: Request) {
  // Parse the request body
  const json = await request.json();
  const token = getAccessToken(request);
  const { title, content, published, authorId } = postSchema.parse(json);
  if (!token) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization token' },
      { status: 401 }
    );
  }

  // e.g. Insert new user into your DB
  const newPost = { title, content, published, authorId };

  return new Response(JSON.stringify(newPost), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
