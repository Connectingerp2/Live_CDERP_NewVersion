import { MarqueeShowcase } from "./MarqueeShowcase";

const achievementsBackgroundImage =
  "https://res.cloudinary.com/bropujss/image/upload/v1783679260/ChatGPT_Image_Jun_18_2026_03_03_25_PM_cfhfki_xag5uw.webp";

const topImages = [
  { id: "t1", src: "https://res.cloudinary.com/bropujss/image/upload/v1783683293/Connecting_Dots_ERP_Mumbai_G.jpg_clflc5_dzq0yq.webp" },
  
  { id: "t3", src: "https://res.cloudinary.com/bropujss/image/upload/v1783681536/CDERP_5_2-2-26_a0xzbd_ja0l2b.webp" , alt: "Connecting Dots Erp" },
  { id: "t4", src: "https://res.cloudinary.com/bropujss/image/upload/v1783681593/CDERP_4_2-2-26_we7qsf_rnbmdh.webp" , alt: "Connecting Dots Erp" },
  { id: "t5", src: "https://res.cloudinary.com/bropujss/image/upload/v1783681825/CDERP_3_2-2-26_yyxffi_sja0im.webp" , alt: "Connecting Dots Erp" },
  { id: "t6", src: "https://res.cloudinary.com/bropujss/image/upload/v1783681965/CDERP_2-2-26_nxxfhk_ygliyu.webp", alt: "Connecting Dots Erp" },
  { id: "t7", src: "https://res.cloudinary.com/duz9xipfm/image/upload/v1765433190/4_gmweo7.avif" , alt: "Connecting Dots Erp" },
  { id: "t8", src: "https://res.cloudinary.com/duz9xipfm/image/upload/v1765433355/19_myauqb.avif" , alt: "Connecting Dots Erp" },
  { id: "t9", src: "https://res.cloudinary.com/duz9xipfm/image/upload/v1765433355/5_opiag2.avif" , alt: "Connecting Dots Erp" },
  { id: "t10", src: "https://res.cloudinary.com/duz9xipfm/image/upload/v1765433489/6_a6d9ch.avif" , alt: "Connecting Dots Erp" },
];
 
const bottomImages= [
  { id: "b1", src: "https://res.cloudinary.com/bropujss/image/upload/v1783682073/CDERP_2_2-2-26_uavlcw_itbfpv.webp"  , alt: "Connecting Dots Erp" },
  { id: "b2", src: "https://res.cloudinary.com/bropujss/image/upload/v1783681029/certificate_ceremony_xx7gax_ucw6yc.webp" , alt: "Connecting Dots Erp" },
  { id: "b2", src: "https://res.cloudinary.com/bropujss/image/upload/v1783682139/WhatsApp_Image_2026-01-09_at_6.10.23_PM_1_piondc_nr8y87.webp"  , alt: "Connecting Dots Erp" },
  { id: "b3", src: "https://res.cloudinary.com/bropujss/image/upload/v1783683611/WhatsApp_Image_2026-02-09_at_3.19.17_PM_djjbgt_el0d1w.webp"  , alt: "Connecting Dots Erp" },
  { id: "b4", src: "https://res.cloudinary.com/bropujss/image/upload/v1783682302/Student_Certificate_pune.jpg_qjrfrf_h4pqps.webp"  , alt: "Connecting Dots Erp" },
  { id: "b5", src: "https://res.cloudinary.com/bropujss/image/upload/v1783682375/sap_JD_geotag.jpg_xykawo_pke0ec.webp" , alt: "Connecting Dots Erp" },
  { id: "b6", src: "https://res.cloudinary.com/bropujss/image/upload/v1783682501/sap_studnet_dexojs_v8bvsd.webp" , alt: "Connecting Dots Erp" },
  { id: "b7", src: "https://res.cloudinary.com/bropujss/image/upload/v1783683741/WhatsApp_Image_2026-03-04_at_11.39.18_AM_1_a1pgng_xsbsbv.webp" , alt: "Connecting Dots Erp" },
  { id: "b8", src: "https://res.cloudinary.com/duz9xipfm/image/upload/v1765433354/15_rpr8xg.avif"  , alt: "Connecting Dots Erp" },
  { id: "b9", src: "https://res.cloudinary.com/duz9xipfm/image/upload/v1765433428/14_ewaid4.avif"  , alt: "Connecting Dots Erp" },
  { id: "b10", src: "https://res.cloudinary.com/bropujss/image/upload/v1783683197/SAP_FICO_Course_Completed_uxxyl3_mheaa3.webp"  , alt: "Connecting Dots Erp" },
];
 
export default function Achievements() {
  return (
    <main
      className="relative w-full max-w-[1800px] mx-auto overflow-hidden py-12 px-4 m-10 flex items-center rounded-lg bg-cover bg-center bg-no-repeat"

      style={{ backgroundImage: `url(${achievementsBackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/20" />
      <div className="relative z-10 w-full">
        <div className="text-center mb-8">
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-wide bg-gradient-to-r from-[#010162] via-[#036f85] to-[#020255] bg-clip-text text-transparent mb-2">
              Glimpses of Excellence
         </h2>
        </div>
        <MarqueeShowcase topImages={topImages} bottomImages={bottomImages} speed={50} />
      </div>
    </main>

  );
}
