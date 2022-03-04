import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import me from '../../Images/me.jpg'

import CircularProgress from '@mui/material/CircularProgress';


export default class RightBarImages extends React.Component {
  constructor () {
    super();
    this.state = {
      imagesAreLoaded: false           
  }
  }
srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}    
dataStream = [
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640183949137-977696531.png',
  },
  {
    img: `${me}`,
  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/profilePictures/Daley-update-profile-picture-1640184634605-875098110.png',
  },
  {
    
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1646316286161-6705357.png',

  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1646316964040-95055731.png',

  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640179029181-482976704.png',
 
  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640179165255-630471660.png',

  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640179018916-921668712.png',

  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/default-post-image.png',

  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640179095807-279606443.png',

    },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640179006546-678218855.png',

  },
  {
    img: 'http://dd252935.kemeneth.net:9000/images/uploads/Daley-change-image-1640178791499-982229389.png',

  },
]
counter = 2;

images = []

formatPictures = () => {
  this.dataStream.forEach(element => {
    if (this.counter === 2) {
      this.images.push(  {
        img: element.img,      
        rows: 2,
        cols: 4
      })
      this.counter = 0;  
    } else {
      this.images.push(  {
        img: element.img,     
        rows: 1,
        cols: 2
      })
      this.counter++
    }
  });  
  
}

componentDidMount = () => {
  this.formatPictures();
  this.setState({imagesAreLoaded: true})
}

  render() {
    const { imagesAreLoaded } = this.state
    if (!imagesAreLoaded) {
      return(
        <ImageList
        sx={{ width: 260, height: '65vh', display: 'flex', justifyContent: 'center' }}
        variant="quilted"
        cols={1}
        rowHeight={121}
        >
          <CircularProgress />  
        </ImageList>
      )
    } else {
      return (
        <ImageList
          sx={{ width: 260, height: '65vh' }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {this.images.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1} >
              <img
                {...this.srcset(item.img, 1, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
    }
  }
}


