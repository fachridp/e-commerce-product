import { useState, useRef, useEffect, useMemo } from "react";
import Swal from "sweetalert2"; // Import Sweet Alert

// Import My Components
import NavItem from "./components/NavItem";
import Descriptive from "./components/Descriptive";

// Import Icons
import iconMenu from "./assets/images/icon-menu.svg";
import iconClose from "./assets/images/icon-close.svg";
import logoWebsite from "./assets/images/logo.svg";
import iconCartButton from "./assets/images/icon-cart-button.svg";
import avatar from "./assets/images/image-avatar.png";
import iconNext from "./assets/images/icon-next.svg";
import iconPrevious from "./assets/images/icon-previous.svg";
import iconMinus from "./assets/images/icon-minus.svg";
import iconPlus from "./assets/images/icon-plus.svg";

// Import Images
import imageProduct1 from "./assets/images/image-product-1.jpg";
import imageProduct2 from "./assets/images/image-product-2.jpg";
import imageProduct3 from "./assets/images/image-product-3.jpg";
import imageProduct4 from "./assets/images/image-product-4.jpg";
import imageProductThumbnail1 from "./assets/images/image-product-1-thumbnail.jpg";
import imageProductThumbnail2 from "./assets/images/image-product-2-thumbnail.jpg";
import imageProductThumbnail3 from "./assets/images/image-product-3-thumbnail.jpg";
import imageProductThumbnail4 from "./assets/images/image-product-4-thumbnail.jpg";

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [countImageProduct, setCountImageProduct] = useState(0);
  const [countImageProductLightbox, setCountImageProductLightbox] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageProductThumbnailLightboxActive, setImageProductThumbnailLightboxActive] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cartEmpty, setCartEmpty] = useState(true);

  const headerRef = useRef(null);
  const cartRef = useRef(null);
  const colletionsRef = useRef(null);
  const menRef = useRef(null);
  const womanRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const deleteItemCartButtonRef = useRef(null);
  const imageProductThumbnailRef1 = useRef(null);
  const imageProductThumbnailRef2 = useRef(null);
  const imageProductThumbnailRef3 = useRef(null);
  const imageProductThumbnailRef4 = useRef(null);
  const imageProductThumbnailLightboxRef1 = useRef(null);
  const imageProductThumbnailLightboxRef2 = useRef(null);
  const imageProductThumbnailLightboxRef3 = useRef(null);
  const imageProductThumbnailLightboxRef4 = useRef(null);
  const nextButtonRef = useRef(null);
  const previousButtonRef = useRef(null);
  const decreaseButtonRef = useRef(null);
  const increaseButtonRef = useRef(null);
  const previousButtonLightboxRef = useRef(null);
  const nextButtonLightboxRef = useRef(null);
  const addToCartButtonRef = useRef(null);
  const closeButtonLightboxRef = useRef(null);
  const checkoutButtonRef = useRef(null);

  let navbarItems;
  const imagesProduct = [imageProduct1, imageProduct2, imageProduct3, imageProduct4];
  const imagesProductThumbnail = useMemo(() => [imageProductThumbnailRef1, imageProductThumbnailRef2, imageProductThumbnailRef3, imageProductThumbnailRef4], []);
  const imagesProductThumbnailLightbox = [imageProductThumbnailLightboxRef1, imageProductThumbnailLightboxRef2, imageProductThumbnailLightboxRef3, imageProductThumbnailLightboxRef4];

  // Give a class to navbarItem when clicked (give it the 'nav-link-active' class) and give it a style.
  const navbarItemClicked = (ref) => {
    navbarItems = [colletionsRef, menRef, womanRef, aboutRef, contactRef];

    navbarItems.forEach((navbarItem) => {
      if (navbarItem.current.dataset.navLabel === ref.current.dataset.navLabel) {
        ref.current.classList.add("nav-link-active", "nav-link-active-after");
      } else {
        navbarItem.current.classList.remove("nav-link-active", "nav-link-active-after");
      }
    });
  }

  // Close the mobile navbar
  const iconCloseClicked = () => {
    setNavbarOpen(false);
  }

  // Open the cart toggle
  const iconCartClicked = () => {
    setCartOpen(!cartOpen);
  }

  // Get previous image of product
  const getPreviousImageProduct = () => {
    if (countImageProduct > 0) {
      setCountImageProduct(countImageProduct - 1);
    }
  }

  // Get next image of product
  const getNextImageProduct = () => {
    if (countImageProduct < imagesProduct.length - 1) {
      setCountImageProduct(countImageProduct + 1);
    }
  }

  // When the thumbnail is clicked, open the lightbox
  const openLightbox = (ref) => {
    // Give it a class active to lightbox thumbnail
    imagesProductThumbnailLightbox[ref.dataset.index].current.classList.add("image-product-thumbnail-lightbox-active");

    // Give it a class active to lightbox thumbnail
    imagesProductThumbnailLightbox[ref.dataset.index].current.classList.add("image-product-thumbnail-active");

    setImageProductThumbnailLightboxActive(imagesProductThumbnailLightbox[ref.dataset.index].current)
    setCountImageProductLightbox(Number(ref.dataset.index));

    // When the thumbnail is clicked, open the lightbox
    setLightboxOpen(true);
  }

  // Get previous image of lightbox
  const getPreviousImageProductLightbox = () => {
    // Preventing the big image lightox from go back when it is the first image
    if (countImageProductLightbox > 0) {
      setCountImageProductLightbox(countImageProductLightbox - 1);

      imagesProductThumbnailLightbox.map(imageProductThumbnailLightbox => {
        // Add the active class to the previous image
        if (imageProductThumbnailLightbox.current.dataset.index == countImageProductLightbox - 1) {
          imageProductThumbnailLightbox.current.classList.add("image-product-thumbnail-lightbox-active");
          imageProductThumbnailLightbox.current.classList.add("image-product-thumbnail-active");

          // Insert the current big image lightbpx and remove it the active class when lightbox is close (will proccess on closeButtonLightbox).
          setImageProductThumbnailLightboxActive(imageProductThumbnailLightbox.current);
        } else {
          // Remove the active class to the previous image
          imageProductThumbnailLightbox.current.classList.remove("image-product-thumbnail-lightbox-active");
          imageProductThumbnailLightbox.current.classList.remove("image-product-thumbnail-active");
        }
      })
    }
  }

  // Get next image of lightbox
  const getNextImageProductLightbox = () => {
    // Preventing the big image lightox from go back when it is the last image
    if (countImageProductLightbox < imagesProduct.length - 1) {
      setCountImageProductLightbox(countImageProductLightbox + 1);

      imagesProductThumbnailLightbox.map(imageProductThumbnailLightbox => {
        if (imageProductThumbnailLightbox.current.dataset.index == countImageProductLightbox + 1) {
          // Add the active class to the next image
          imageProductThumbnailLightbox.current.classList.add("image-product-thumbnail-lightbox-active");
          imageProductThumbnailLightbox.current.classList.add("image-product-thumbnail-active");
          setImageProductThumbnailLightboxActive(imageProductThumbnailLightbox.current);
        } else {
          // Remove the active class to the next image
          imageProductThumbnailLightbox.current.classList.remove("image-product-thumbnail-lightbox-active");
          imageProductThumbnailLightbox.current.classList.remove("image-product-thumbnail-active");
        }
      })
    }
  }

  // Close the lightbox
  const closeButtonLightbox = () => {
    setLightboxOpen(false);
    imageProductThumbnailLightboxActive.classList.remove("image-product-thumbnail-lightbox-active");
    imageProductThumbnailLightboxActive.classList.remove("image-product-thumbnail-active");
  }

  // Decrease the quantity of the product
  const buttonDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  // Increase the quantity of the product
  const buttonIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  // Add items to the cart
  const addItemsToCart = () => {
    if (quantity > 0) {
      setCartEmpty(false);
    }
  }

  // Delete items from the cart
  const deleteItemsFromCart = () => {
    setCartEmpty(true);
  }

  // Checkout
  const checkoutButtonClicked = () => {
    // Show a success checkout message
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you for your order!",
      showConfirmButton: true,
    });

    // Empty the cart after checkout
    setCartEmpty(true);
  }

  // Handle resize browser
  const handlerResizeBrowser = () => {
    // If screen size 768px remove the overlay-after classes
    if (window.innerWidth > 768) {
      headerRef.current.classList.remove("overlay-after");
      setNavbarOpen(false);
    } else {
      // If screen size below 768px, close the lightbox
      setLightboxOpen(false);
    }
  }

  // Resize the browser event
  useEffect(() => {
    window.addEventListener("resize", handlerResizeBrowser);

    // Give a class to each imageProductThumbnail (guve it opacity and border style)
    imagesProductThumbnail.map(imageProductThumbnail => {
      if (imageProductThumbnail.current.dataset.index == countImageProduct) {
        imageProductThumbnail.current.classList.add("image-product-thumbnail-active");
      } else {
        imageProductThumbnail.current.classList.remove("image-product-thumbnail-active");
      }
    });

    // If quantity is 0, set cartEmpty to true or empty the cart
    if (quantity < 1) {
      setCartEmpty(true);
    }
  }, [countImageProduct, imagesProductThumbnail, quantity]);

  return (
    <>
      {/* Header */}
      <header ref={headerRef} className={`max-wrapper relative ${navbarOpen ? "overlay-after" : ""}`}>
        <nav className="flex flex-wrap items-center justify-between p-5 mx-auto md:border-b-[1px] md:mx-8">
          <div className="flex items-center gap-3">
            {/* Mobile Navbar Icon */}
            <button aria-label="Menu" className="md:hidden" onClick={() => setNavbarOpen(!navbarOpen)}>
              {navbarOpen ? "" : (
                <img
                  className="w-[.9rem]"
                  src={iconMenu}
                  alt="Icon Menu"
                />
              )}
            </button>

            {/* Logo Website */}
            <a href="/">
              <img src={logoWebsite} alt="Logo Website" />
            </a>

            {/* Desktop Navbar */}
            <ul className="hidden h-full md:flex md:items-center md:gap-6 md:ml-7">
              <NavItem ref_props={colletionsRef} func_props={() => navbarItemClicked(colletionsRef)} label="Collections" />
              <NavItem ref_props={menRef} func_props={() => navbarItemClicked(menRef)} label="Men" />
              <NavItem ref_props={womanRef} func_props={() => navbarItemClicked(womanRef)} label="Women" />
              <NavItem ref_props={aboutRef} func_props={() => navbarItemClicked(aboutRef)} label="About" />
              <NavItem ref_props={contactRef} func_props={() => navbarItemClicked(contactRef)} label="Contact" />
            </ul>
          </div>

          {/* Icon Cart and Avatar */}
          <div className="flex items-center gap-3 md:gap-8">
            {/* Icon Cart */}
            <button aria-label="Cart" ref={cartRef} onClick={() => iconCartClicked()} className="relative">
              <svg className="duration-75 ease-in-out md:hover:fill-very-dark-blue" fill="#69707D" width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fillRule="nonzero" /></svg>

              {cartEmpty ? "" :
                <p className="absolute flex items-center justify-center w-6 h-4 text-xs font-bold text-white rounded-full -right-3 -top-2 bg-orange">{quantity}</p>
              }
            </button>

            {/* Icon Avatar */}
            <button aria-label="Avatar" className="md:hover:ring-[2px] md:hover:ring-orange md:hover:rounded-full duration-75 ease-in-out">
              <img className="w-6 md:w-10" src={avatar} alt="Profile Picture" />
            </button>
          </div>

          {/* Wrapper Cart Notification */}
          <div className={`absolute left-1/2 -translate-x-1/2 md:right-40 md:translate-x-1/2 top-[4.5rem] z-10 ${cartOpen ? "" : "hidden"} ${navbarItems ? "" : ""}`}>
            <div className="w-[280px] h-[190px] relative flex flex-col px-3 pt-4 pb-6 text-sm bg-white rounded-md shadow-xl border-after">
              <Descriptive styling_props="text-very-dark-blue font-bold" label="Cart" />

              {/* Products In Cart */}
              <div className="relative flex items-center justify-center h-full gap-4 mt-7">
                {cartEmpty ? <p className="font-bold text-dark-grayish-blue">Your cart is empty.</p> :
                  <>
                    {/* Each Product */}
                    <div className="flex items-center justify-center gap-2 text-dark-grayish-blue">
                      {/* Product Image */}
                      <img className="w-8 rounded-[3px]" src={imageProduct1} alt="Product Image" />

                      {/* Poduct Name */}
                      <div>
                        <p>Fall Limited Edition Sneakers</p>
                        <span>$125.00 x {quantity} </span> <span className="font-bold text-very-dark-blue">${125.00 * quantity}.00</span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button aria-label="Delete" ref={deleteItemCartButtonRef} onClick={() => deleteItemsFromCart()}>
                      {/* <img className="w-3" src={iconDelete} alt="Icon Delete" /> */}
                      <svg className="fill-[#C3CAD9] hover:fill-red-500 ease-in-out duration-75" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a" /></defs><use fillRule="nonzero" xlinkHref="#a" /></svg>
                    </button>
                  </>
                }
              </div>
              {/* Button Checkout */}
              {cartEmpty ? "" : <button aria-label="Checkout" ref={checkoutButtonRef} onClick={() => checkoutButtonClicked(checkoutButtonRef.current)} className="py-[.68rem] mt-5 font-bold rounded-md bg-orange text-very-dark-blue md:hover:opacity-70 ease-in-out">
                Checkout
              </button>}

            </div>
          </div>

          {/* Mobile Navbar */}
          <div className={`space-y-6 z-10 ${navbarOpen ? "fixed top-0 left-0 w-[11.875rem] h-screen p-5 bg-white shadow-md md:hidden z-[12]" : "hidden"}`}>
            <button aria-label="Close" onClick={() => iconCloseClicked()}>
              <img src={iconClose} alt="Icon Close" />
            </button>

            <ul className="space-y-6 font-bold text-very-dark-blue">
              <NavItem label="Collections" />
              <NavItem label="Men" />
              <NavItem label="Women" />
              <NavItem label="About" />
              <NavItem label="Contact" />
            </ul>
          </div>
        </nav>
      </header >

      {/* Main */}
      <main className={`max-wrapper ${lightboxOpen ? "overlay-after" : ""}`}>
        <div className="relative md:grid md:grid-cols-2 md:pt-16 md:px-16 md:gap-11 lg:gap-0">
          {/* Left Section */}
          <section className="md:max-w-[315px] lg:max-w-[320px]">
            {/* Product Big Image */}
            <div className="relative">
              <img className="w-full md:rounded-xl" src={imagesProduct[countImageProduct]} alt="Product Big Image" />

              {/* Previous and Next Button */}
              <div className="md:hidden">
                <button aria-label="Previous" ref={previousButtonRef} onClick={() => getPreviousImageProduct(previousButtonRef.current)} className="absolute top-1/2 left-4 translate-y-[-50%] bg-white w-8 h-8 rounded-full">
                  <img className="w-[8px] mx-auto" src={iconPrevious} alt="Icon Previous" />
                </button>
                <button aria-label="Next" ref={nextButtonRef} onClick={() => getNextImageProduct(nextButtonRef.current)} className="absolute top-1/2 right-4 translate-y-[-50%] bg-white w-8 h-8 rounded-full">
                  <img className="w-[8px] mx-auto" src={iconNext} alt="Icon Next" />
                </button>
              </div>
            </div>

            {/* Product Thumbnail */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-5 md:pt-4 md:max-w-[315px] lg:max-w-[320px]">
              <button aria-label="Thumbnail 1" ref={imageProductThumbnailRef1} onClick={() => openLightbox(imageProductThumbnailRef1.current)} data-index="0" data-image-product={imageProduct1} className="ease-in-out rounded-md md:hover:image-product-thumbnail-lightbox-active">
                <img className="ease-in-out rounded-md md:hover:opacity-50" src={imageProductThumbnail1} alt="Image Product Thumbnail" />
              </button>
              <button aria-label="Thumbnail 2" ref={imageProductThumbnailRef2} onClick={() => openLightbox(imageProductThumbnailRef2.current)} data-index="1" data-image-product={imageProduct2}>
                <img className="ease-in-out rounded-md md:hover:opacity-50" src={imageProductThumbnail2} alt="Image Product Thumbnail" />
              </button>
              <button aria-label="Thumbnail 3" ref={imageProductThumbnailRef3} onClick={() => openLightbox(imageProductThumbnailRef3.current)} data-index="2" data-image-product={imageProduct3}>
                <img className="ease-in-out rounded-md md:hover:opacity-50" src={imageProductThumbnail3} alt="Image Product Thumbnail" />
              </button>
              <button aria-label="Thumbnail 4" ref={imageProductThumbnailRef4} onClick={() => openLightbox(imageProductThumbnailRef4.current)} data-index="3" data-image-product={imageProduct4}>
                <img className="ease-in-out rounded-md md:hover:opacity-50" src={imageProductThumbnail4} alt="Image Product Thumbnail" />
              </button>
            </div>
          </section>

          {/* Right Section */}
          <section className="px-4 pt-4 pb-16 md:pb-0 md:px-0 md:pt-6 md:max-w-[402px]">
            {/* Fall Limited Edition Sneakers */}
            <Descriptive styling_props="uppercase tracking-widest text-sm" label="Sneaker Company" />

            <h1 className="mt-2 text-3xl font-bold leading-8 text-very-dark-blue md:max-w-[302px] lg:text-[40px] lg:max-w-[380px] lg:leading-[2.8rem]">Fall Limited Edition Sneakers</h1>

            <Descriptive styling_props="my-4" label="These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer" />

            {/* Wrapper Price */}
            <div className="flex flex-wrap items-center justify-between lg:items-start lg:flex-col lg:gap-2">

              {/* Left Price */}
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-very-dark-blue">$125.00</p>

                <p className="px-2 py-1 text-sm font-bold text-white rounded-md bg-very-dark-blue">50%</p>
              </div>

              {/* Right Price */}
              <div>
                <p className="text-sm font-bold line-through text-dark-grayish-blue">$250.00</p>
              </div>
            </div>

            {/* Quantity and Add to Cart Button */}
            <div className="flex flex-col justify-start gap-4 mt-5 md:flex-row lg:max-w-[430px]">
              {/* Quantity Button */}
              <div className="flex items-center justify-between px-4 py-3 font-bold rounded-md bg-light-grayish-blue text-very-dark-blue md:flex-1 lg:basis-56">
                <button aria-label="Decrease Quantity" ref={decreaseButtonRef} className="flex items-center justify-center h-5 ease-in-out basis-8 md:hover:opacity-50" onClick={() => buttonDecreaseQuantity(decreaseButtonRef.current)}>
                  <img src={iconMinus} alt="Icon Minus" />
                </button>
                <p>{quantity}</p>
                <button aria-label="Increase Quantity" ref={increaseButtonRef} className="flex items-center justify-center h-5 ease-in-out basis-8 md:hover:opacity-50" onClick={() => buttonIncreaseQuantity(increaseButtonRef.current)}>
                  <img src={iconPlus} alt="Icon Plus" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button aria-label="Add to Cart" ref={addToCartButtonRef} onClick={() => addItemsToCart(addToCartButtonRef.current)} className="flex items-center justify-center gap-4 py-4 text-sm font-bold duration-75 ease-out rounded-md bg-orange text-very-dark-blue md:hover:opacity-70 md:gap-2 md:flex-1 lg:basis-full">
                <img className="w-5" src={iconCartButton} alt="Icon Cart" />
                <p>Add to cart</p>
              </button>
            </div>
          </section>
        </div>

        {/* Lightbox */}
        <div className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${lightboxOpen ? "z-[12]" : "hidden"}`}>
          <div className="relative w-[23rem]">
            {/* Close Button Lightbox */}
            <button aria-label="Close Lightbox" ref={closeButtonLightboxRef} onClick={() => closeButtonLightbox(closeButtonLightboxRef.current)} className="absolute right-0 -top-7">
              <svg className="fill-light-grayish-blue hover:fill-[#FF7D1A] ease-in-out duration-75" width="14" height="15" xmlns="http://www.w3.org/2000/svg">
                <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fillRule="evenodd" />
              </svg>
            </button>

            {/* Product Big Image Lightbox */}
            <div className="relative">
              <img className="rounded-md" src={imagesProduct[countImageProductLightbox]} alt="Image Product" />

              {/* Previous and Next Button Lightbox */}
              <div>
                <button aria-label="Previous Image Product" ref={previousButtonLightboxRef} onClick={() => getPreviousImageProductLightbox(previousButtonLightboxRef.current)} className="absolute top-1/2 -left-4 translate-y-[-50%] bg-white w-7 h-7 rounded-full">
                  <svg className="mx-auto stroke-[#1D2026] hover:stroke-[#FF7D1A]" width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1 3 9l8 8" strokeWidth="3" fill="none" fillRule="evenodd" />
                  </svg>
                </button>
                <button aria-label="Next Image Product" ref={nextButtonLightboxRef} onClick={() => getNextImageProductLightbox(nextButtonLightboxRef.current)} className="absolute top-1/2 -right-4 translate-y-[-50%] bg-white w-7 h-7 rounded-full">
                  {/* <img className="w-[8px] mx-auto" src={iconNext} alt="Icon Next" /> */}
                  <svg className="mx-auto stroke-[#1D2026] hover:stroke-[#FF7D1A]" width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="m2 1 8 8-8 8" strokeWidth="3" fill="none" fillRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Thumbnail Lightbox */}
            <div className="md:grid md:grid-cols-4 md:gap-4 md:pt-4 md:max-w-[315px] md:mx-auto">
              <button aria-label="Thumbnail Product 1" className="duration-75 ease-in-out md:hover:image-product-thumbnail-lightbox-active" ref={imageProductThumbnailLightboxRef1} data-index="0">
                <img className="rounded-md relative -z-[1]" src={imageProductThumbnail1} alt="Image Product" />
              </button>
              <button aria-label="Thumbnail Product 2" className="duration-75 ease-in-out md:hover:image-product-thumbnail-lightbox-active" ref={imageProductThumbnailLightboxRef2} data-index="1">
                <img className="relative rounded-md -z-[1]" src={imageProductThumbnail2} alt="Image Product" />
              </button>
              <button aria-label="Thumbnail Product 3" className="duration-75 ease-in-out md:hover:image-product-thumbnail-lightbox-active" ref={imageProductThumbnailLightboxRef3} data-index="2">
                <img className="relative rounded-md -z-[1]" src={imageProductThumbnail3} alt="Image Product" />
              </button>
              <button aria-label="Thumbnail Product 4" className="duration-75 ease-in-out md:hover:image-product-thumbnail-lightbox-active" ref={imageProductThumbnailLightboxRef4} data-index="3">
                <img className="relative rounded-md -z-[1]" src={imageProductThumbnail4} alt="Image Product" />
              </button>
            </div>
          </div>
        </div>
      </main >
    </>
  )
}