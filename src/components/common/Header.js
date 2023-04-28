import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import AccountForm from "@/components/form/AccountForm";
import SearchForm from "@/components/form/SearchForm";
import { useSession, signOut } from "next-auth/react";
import useScrollDisable from "@/hooks/useScrollDisable";
import { cartState } from "@/states/CartState";

const Header = () => {
  const [accountFormVisible, setAccountFormVisible] = useState(false);
  const [searchFormVisible, setSearchFormVisible] = useState(false);

  useScrollDisable(accountFormVisible || searchFormVisible);

  const { data: session } = useSession();

  const cartItems = cartState.use();
  const [isSticky, setIsSticky] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  // handle the sticky-header
  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

    window.addEventListener("scroll", handleIsSticky);

    return () => {
      window.removeEventListener("scroll", handleIsSticky);
    };
  }, [isSticky]);

  useEffect(() => {
    setCartQuantity(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <header id="header" className={isSticky ? "sticky" : ""}>
        <div className="container">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link href="/">NextAudio</Link>
            </h2>
            <nav className="nav_actions">
              <div className="search_action">
                <span onClick={() => setSearchFormVisible(true)}>
                  <AiOutlineSearch />
                </span>
                <div className="tooltip">Search</div>
              </div>

              <div className="cart_action">
                <Link href="/cart">
                  <AiOutlineShoppingCart />
                  {cartQuantity > 0 && (
                    <span className="badge">{cartQuantity}</span>
                  )}
                </Link>
                <div className="tooltip">Cart</div>
              </div>

              <div className="user_action">
                <span>
                  <AiOutlineUser />
                </span>
                <div className="dropdown_menu">
                  <h4>Hi! {session && <b>&nbsp;{session.user.username}</b>}</h4>
                  {!session ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAccountFormVisible(true);
                      }}
                    >
                      Login / Signup
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        signOut({
                          redirect: false,
                        })
                      }
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {accountFormVisible && <AccountForm setVisible={setAccountFormVisible} />}
      {searchFormVisible && <SearchForm setVisible={setSearchFormVisible} />}
    </>
  );
};

export default Header;
