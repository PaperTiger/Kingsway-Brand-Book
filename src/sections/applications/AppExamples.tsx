import img1 from '../../assets/application/Frame.jpg'
import img2 from '../../assets/application/Frame (1).jpg'
import img3 from '../../assets/application/Group 1984079146.jpg'
import img4 from '../../assets/application/Group 1984079159.png'
import img5 from '../../assets/application/Group 1984079170.png'
import img6 from '../../assets/application/Cover — WorRC Phase Two.jpg'
import img7 from '../../assets/application/Cover — WorRC Phase Two (1).jpg'
import img8 from '../../assets/application/Cover — WorRC Phase Two (2).jpg'

const images = [img1, img2, img3, img4, img5, img6, img7, img8]

export default function AppExamples() {
  return (
    <div className="page">
      <div className="section-label">Applications</div>
      <h2 className="section-title">Examples</h2>
      <p className="section-intro">
        The Kingsway system applied across pitch decks, social media, merchandise,
        and digital media.
      </p>
      <div className="masonry-grid" style={{ margin: "0 0 80px" }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt="Application example" />
        ))}
      </div>
    </div>
  )
}
