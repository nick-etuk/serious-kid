import React, { useState, useEffect } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";
import shorthash from 'shorthash2';
import * as FileSystem from "expo-file-system";

interface CachedImageProps {
    url: string;
    style: StyleProp<ImageStyle>;
}
function CachedImage (props:CachedImageProps) {
    const { url, style } = props;
    const [ uri, setUri ] = useState(''); 
    useEffect(() => { Cached(); }, []);
    
    async function Cached() {
        //hash the image url
        const name = shorthash(url);
        //save image in user system using the shorthash filename 
        const path = `${FileSystem.cacheDirectory}${name}`;
        //invoke the user file system to check if the the path with specific name 
        const image = await FileSystem.getInfoAsync(path);
        //if image path exists, display it without loading the external url 
        if (image.exists) {
            setUri(image.uri);
            return;
        }
        //if the image path not exists then we cache it in the user system for further use
        const newImage = await FileSystem.downloadAsync(url, path);
        setUri(newImage.uri);
    }
        return <Image style={style} source={{ uri: url }} />;
}
export default CachedImage;
