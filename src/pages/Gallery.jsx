import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import FsLightbox from "fslightbox-react";

export const Gallery = () => {
  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white transition-all overflow-hidden">
      <ReactLenis root options={{ lerp: 0.08, infinite: true }}>
        <ParallaxImages />
      </ReactLenis>
    </div>
  );
};

const ParallaxImages = () => {
  // Replace placeholder images with the provided list
  const [images, setImages] = useState([
    "https://cdn.sanity.io/images/gcb0j4e6/production/9dbd07a7df7427b447367fb10733290233436960-6000x3368.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8c71e8115be50f806b0f44dce41a7f019290679b-6000x3368.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/def9e8d503a5f5428b853cb85287c2f3db13516e-5886x3924.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/401ce409743a71bbd2f06e4bbab03a7e8f982feb-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/e917f1b65834cee08823b0daa6e46faafa66069e-3647x5470.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/fbdac6fd18a163de9d0c29b6cc7d5e090e01608c-4839x3226.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f61607cb88dd4aa37116765ba4d5338dba78d7f8-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/fcdec82e8b31b37e155a6c5251040af94d651d9a-5094x3422.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/aa6f7e630c77917ddca7ceeb06995d222059b99a-4951x2890.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/1617e67041e504cb2413aae8d8e7e84f9c1db056-5886x3312.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b342395ee0a7ab0cf97ac198a1eb2515faae954e-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/e43e45775442cfcb7cc2a4e5080a94a27063e6c6-4922x2769.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/ea8c7351148e2778d0a889f3061ab890e44f53ad-5458x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/c9638d910be649be006954a246b7084ca7bc7c0b-5888x3313.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/69981ca5afba5679c1b8efb3659e7e252eac43cb-5262x2960.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/871b8b8cb83a08b9f3c3ad1afb1c304f94032ee9-4529x2548.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/3d1ad840adf0b5e81bfadcbe2d9907705731495d-3645x2050.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/13170547c6a833611c5f95059cf24fcb694112b6-4710x2650.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/fb3c4e90472188ca7a64b940a0378bb59eefe944-420x630.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/72e2e5072c32e2681da8a2c39bc9b98d0e181178-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/85cc353aa9b0097fc55e96977fad1566ba640559-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/70ef9af7f5bb9877969530d45e11c6ed67821c1c-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/5c05c4ed74a1d6747bae8df8e75680dbf37662c6-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/5d1d68e65d0e0dfe697719fd2fdd95561d0a86cb-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/5f50f71bde9ff0410a4f426212d62d12582ed056-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/119d1b162d31f6203e0759c817ef508b64f78bcd-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f3af3cc03c48135c7fda08d7836220e3cf6bbc29-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/5a2c8fb8fb8ef8f983a0348d14870b5d2c39b00a-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/add5a6fb74759766b68597509d2d6797639a989e-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/ba9984f2a590f830cd7fcd7b38833dbdc252b70d-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/695b749ca83fe9606079ccf38a906fae63546242-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/1f2b548dcc6cf8a9d761fbb1b54306202942d3aa-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/796aac5f91adf6bc4802cca3aa6b430cc86ad4eb-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/ed968299d6078d4879699ba27a2f351718034cfa-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/69b76db321bc937844183138ead490114c5d8b77-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/0f4e0476490122e79061ea7d377ec984ea7c204a-5680x3787.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/3937bcb4e9f8097e9935d02f0c19af311f5cfd5f-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/353c7039e1ff85536e481bcc2ff9fed24ba01463-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/37bd7a71d2e8af9110129210c628036e73c40f24-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/d28ee7215e552bf63f3f55ad1ecf8650fcd17cdf-4032x3024.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f5c35ffd8bf98902106d116ab38b472df1e75020-3024x4032.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/227f6afb8c723ced3071d2c71707025986be663f-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/227f6afb8c723ced3071d2c71707025986be663f-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f752b15054309ddd11eebba4f9ccb5adb1b455e6-2160x3840.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f752b15054309ddd11eebba4f9ccb5adb1b455e6-2160x3840.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/52886d1cca95ef81545fa8ef51cca1088d957a87-2160x3840.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/7ce20404e5a25bcbddbbe48943d962e98274e31b-2160x3840.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/bbee2607b58e06b08c2b06f0d206408ac653a0fe-2160x3840.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/75507247629834e86d4bd90542a705ce8037eab3-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/2f6ddf14bffc83ecd0740ac65d4450a41b4d13e8-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/988ce6d5e3e968a6959f7a4229918ec59b0fa8ed-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b9ec7987b9912b89dcfeb2e91404813a13e9bf89-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/c66174730ff27e22d93364ef01072d8b2a587905-4608x3072.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/9d327c07447d4dc2359f2d154f0e53eb60343376-2268x4032.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/ee65406123dcc787df0059cb7041c9a90dc6d58d-1080x1920.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8b64ea75a8f800e4029d1af02608fa7343e60ff0-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b6d22cbe7509dcfd90ff9d351a6c55c9ac392cc0-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/d5982c9826bdab3c7c13b25b019706b8f18efc7e-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/dce19c78622f4e8caec01b18e114ed2dfecdc19a-4032x3024.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/0a8a34b35718dc47e0510f9067ee0b73789b4723-4608x3072.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8ebb5d586e3f510ad2ba9acf88d3dca248f10944-3520x1980.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/371f660462d8a40c1dd16de2c4a42a8c513cb1cc-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/62b02608a201b0f5dea34d01be9a58167144c9c6-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/1747fc622e1ace51e5cecde58647d78e95a15321-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/434e0511cc9cec1617454194b27de110bcae5714-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/6d0dbf810d38139cc0155ce6aa8ca24a7e523811-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/daee9ab5d2cb207b86ba227b11edf1b931b8c667-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/2a5824ce886c758379abd3d47b147d4fa5eaa58e-4032x3024.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b1f9451422c10b53c4d6ec2d3f53baff5beb7964-5712x4284.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/fca29d531035ddde4d19a46fcc53850d5214b54e-3024x4032.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/daee9ab5d2cb207b86ba227b11edf1b931b8c667-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/9c8c0dae50b97b679e171abffccb0343730e4f82-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/443cf68ebfe44d844cd5f9181a6942d5fc9d94ec-3840x2160.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/7fb23d3ef620493c0a6a363120023cc428faac95-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8aba475b100c1b7188c62b4ca7c6bb85e66fdc3b-5288x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/fa8f8510a570f3e8f864fb1f2d03bcebe5c3a198-4981x3414.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b034b73585b2993bf15e69bab146bae8e82b92b7-5540x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/4c00447a17f284a44dc6b08940d4cc1c3e40b79a-3840x2160.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/05279dbf3cecadf6537910bbf1aeb81f049fdb53-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/47880a2731934feb03dc7c9c766c64f7839ef3c1-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/52f150b3da8c2444f3c0147c51ce43e538df68bb-5712x4284.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/cabe3422a8b8cc6150ba3d80287fd83530356ad4-4032x3024.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/a09117f0e07d75dc5f87b6986395862fae9a730a-5712x4284.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/7fb23d3ef620493c0a6a363120023cc428faac95-6000x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8aba475b100c1b7188c62b4ca7c6bb85e66fdc3b-5288x3376.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/5a046035a258cfbd6ac318f3b3c9a7ca3c71993c-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b9e3a19b1b0e286c3dc4d434688a1861f05d02fe-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/163c20507c7ad6b77374888be8ea7ce03ca41be5-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b553ccd0c3e82505396c925fb092790755d90965-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b43381a8645ade523270b61dfc5c8cd3bba7e581-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/7a102877c47f5422ae9c2d17ec51ef9c7d135e9b-4623x3467.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/6f3fd5a6c75325f987e2e26471f34cc7fafdcf66-3344x2508.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/90b2d904a98539476ec38d3f742dfa28dd6f5578-5184x3888.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/90d4a018cdd3e6c30b5afbc5341c33015b6a0fee-3473x2605.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/44b1fc24316280fd710a55129023b53191567524-5172x3879.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/724800e45b1a5b350bbc57e30ea52d1d629d26de-5184x3888.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/18c363ecd43eebf6a9bc0b70daf77047fee248f5-5173x3880.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/d124c306560fae1f571a4a9ab9fa819ee574bd5b-5184x3888.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/2a31d27e12fa66982f132d94fbc466c9700b9018-5184x3888.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/503ff4f02824a857519ece33044bc022df98d99a-5184x3888.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/244a836595e63d16f53779a401595eb94a362342-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b803c558a0fdee54ce8648ed9f2906b5b6726e4f-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/112f730ce8daa87bb2fba8f6f8898c473aa343d5-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/6f2d7135a457017f3b67a88d8dc066dad14c9129-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/541626ade3bfe0d3275f655e05c4f62f1743ce1c-4000x6000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/506129bda2683107350104d75600b65b083f83e1-4160x3120.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8bf5f2a3fe1f14d1bec19e773762edea1a41eb0e-4032x3024.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/09b6958546a0e7cd9c580e91e6ec83a57ac898b0-4032x3024.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f2dc988c7b47d0608e8b6dfa74980866b4b8aeb6-3024x4032.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/92abbb5127ecb3d5e93437a151ee457d19fec6a8-3120x4160.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/b25240f89eb8a864c8d177999a43c8467f4f12f0-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/0e596346341793664447441c98eccd54570a6271-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/d0272745244e65c8b3ce16f757ec6173524a1671-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/f09504878a4be76ec7f83b8dbcad41a5133fbafd-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/1cc4bddf57626837b92ac030c9d6ba34889cbbc5-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/0110f0fc902e35627eaa0111f7d002ab9aeb3b37-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/7d4162796fdd8391005ef1140cdc65fd37923f2d-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/8251564623b4ef9f03b7b526d5bd202701209d7a-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/393432064461fefebb309b1000fe1bebcd352e3c-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/730457077395182805bc7c1b7020953607c4c204-6000x4000.jpg?w=600&h=400",
    "https://cdn.sanity.io/images/gcb0j4e6/production/541626ade3bfe0d3275f655e05c4f62f1743ce1c-4000x6000.jpg?w=600&h=400",
  ]);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400) {
        setImages((prev) => [
          ...prev,
          ...Array.from({ length: 10 }, (_, i) => `https://picsum.photos/600/400?random=${prev.length + i}`),
        ]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLightbox = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler, // Ensure toggler always updates uniquely
      slide: index, // Set the correct slide index
    });
  };

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <ParallaxImg
            key={i}
            src={src}
            alt={`Gallery Image ${i + 1}`}
            index={i + 1}
            openLightbox={openLightbox}
            row={i % 4}
          />
        ))}
      </div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images}
        slide={lightboxController.slide}
      />
    </div>
  );
};

const ParallaxImg = ({ alt, src, index, openLightbox, row }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-200px start", "end end"],
  });

  // Smoother Depth Animations
  const yValues = [[-80, 80], [80, -80], [-60, 60], [60, -60]];
  const y = useTransform(scrollYProgress, [0, 1], yValues[row]);
  const scale = useTransform(scrollYProgress, [0.2, 1], [0.9, 1.2]);

  // Mouse Interaction (3D depth)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 40 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 50);
    mouseY.set(y * 50);
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg transition-all"
      style={{ y, scale, rotateX: springX, rotateY: springY }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 10px 40px rgba(0, 255, 255, 0.5)",
      }}
      onMouseMove={handleMouseMove}
      onClick={() => openLightbox(index)}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-64 object-cover rounded-xl transition-all duration-300"
        whileHover={{
          filter: "brightness(1.2) contrast(1.2)",
        }}
      />
    </motion.div>
  );
};

export default Gallery;