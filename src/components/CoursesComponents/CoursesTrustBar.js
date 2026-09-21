import TrustBar from "../HomePage/TrustBar"
import SectionHeading from "./SectionHeading"

const CoursesTrustBar = ({ rating }) => {
  return (
    <div className="w-full mx-auto max-w-[1800px] bg-white py-[20px]">
      <SectionHeading title="Trust Bar" />
      <TrustBar rating={rating} />
    </div>
  )
}
export default CoursesTrustBar