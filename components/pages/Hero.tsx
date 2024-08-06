import Link from "next/link";
import { User } from "@/types";

interface HeroProps {
  user: User | null;
}
const Hero: React.FC<HeroProps> = ({ user }) => {
  return (
    <section>
      {user ? (
        user.role !== "ADMIN" ? (
          <div className="center-col h-screen gap-2">
            <h1>Welcome back, {user.name}!</h1>
            <p>The best place to buy any product</p>
            <div className="mt-2">
              <button className="primary-btn mr-4">
                <Link href="/products">Browse</Link>
              </button>
              <button className="secondary-btn">
                <Link href="/cart">See Cart</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="center-col h-screen gap-2">
            <h1>Welcome back, {user.name}!</h1>
            <p>The best place to buy any product</p>
            <div className="mt-2">
              <button className="primary-btn mr-4">
                <Link href="/products">Browse</Link>
              </button>
              <button className="secondary-btn">
                <Link href="/dashboard">Dashboard</Link>
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="center-col h-screen gap-2">
          <h1>Wellcome in YASHSTOCK</h1>
          <p>The best place to buy any product</p>
          <div className="mt-2">
            <button className="primary-btn mr-4">
              <Link href="/products">Browse</Link>
            </button>
            <button className="secondary-btn">
              <Link href="/register">Sign Up</Link>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
