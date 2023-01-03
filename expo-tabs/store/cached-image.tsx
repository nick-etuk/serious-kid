import React, { useEffect, useState, useRef } from 'react'

import { Image } from 'react-native'

import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash2';
import { imageStyles } from 'styles';
import { log } from 'utils';


//import PropTypes from 'prop-types'
interface CachedImageProps {
    url: string;
    filename: string;
  }

function CachedImage (props:CachedImageProps) {
    const { url, filename } = props;
    const cacheKey = shorthash(url);
    const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`
    const [imgURI, setImgURI] = useState(filesystemURI)
    const componentIsMounted = useRef(true)

    useEffect(() => {
        const loadImage = async (fileURI:string) => {
        try {
            // Use the cached image if it exists
            const metadata = await FileSystem.getInfoAsync(fileURI)
            if (!metadata.exists) {
            // download to cache
            if (componentIsMounted.current) {
                //setImgURI(null)
                setImgURI(url)
                await FileSystem.downloadAsync(
                url,
                fileURI
                )
            }
            if (componentIsMounted.current) {
                setImgURI(fileURI)
            }
            }
        } catch (err) {
            console.log() // eslint-disable-line no-console
            setImgURI(url)
        }
        }

        loadImage(filesystemURI)

        return () => {
        componentIsMounted.current = false
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

        //          {/* ...props */}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {log(0, 'image uri', imgURI, true)}

        return (
            <Image style={imageStyles.normal} source={{ uri: imgURI }}/>
        )
    }


export { CachedImage };