import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./styles.module.css";

const AccommodationDetailImageGallery = ({ data }) => {
    if (!data?.fetchTravelproduct?.images) return;

    const images = data?.fetchTravelproduct?.images.filter(Boolean).map((img) => {
        return {
            original: `https://storage.googleapis.com/${img}`,
            thumbnail: `https://storage.googleapis.com/${img}`,
        };
    });
    return (
        <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            thumbnailPosition="right"
            showNav={false}
            showBullets={false}
            renderItem={(item) => (
                <div className={styles.image_gallery_container}>
                    <img src={item.original} alt="" className={styles.image_gallery_image} />
                </div>
            )}
        />
    );
};

export default AccommodationDetailImageGallery;
