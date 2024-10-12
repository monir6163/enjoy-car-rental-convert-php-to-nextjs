"use client";
interface Props {
  session: any;
}

export default function ProfileComponent({ session }: Props) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session.user.email || session.user.name}!</p>
    </div>
  );
}
