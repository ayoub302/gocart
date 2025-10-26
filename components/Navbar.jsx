"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
          {/* Logo */}
          <Link
            href="/"
            className="relative text-4xl font-semibold text-slate-700"
          >
            <span className="text-green-600">go</span>cart
            <span className="text-green-600 text-5xl leading-0">.</span>
            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
              plus
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">Accueil</Link>
            <Link href="/shop">Boutique</Link>
            <Link href="/">À propos</Link>
            <Link href="/">Contact</Link>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-60 text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Rechercher des produits"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-slate-600"
            >
              <ShoppingCart size={18} />
              <span>Panier</span>
              <span className="absolute -top-2 left-3 text-[10px] text-white bg-slate-600 h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount ?? 0}
              </span>
            </Link>

            {/* User Buttons */}
            {!user ? (
              <>
                <SignInButton>
                  <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition">
                    Connexion
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition">
                    S'inscrire
                  </button>
                </SignUpButton>
              </>
            ) : (
              <UserButton />
            )}
          </div>

          {/* Mobile User Button */}
          <div className="sm:hidden">
            {!user ? (
              <SignInButton>
                <button className="px-5 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition">
                  Connexion
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  );
};

export default Navbar;
