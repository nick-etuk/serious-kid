import React, { useState, useEffect } from "react";
import { Image, ImageStyle, StyleProp, Text, Platform } from "react-native";
import shorthash from 'shorthash2';
import * as FileSystem from "expo-file-system";
import { log } from "../utils";
import { API_URL } from "../utils/constants";
import { styles } from "../styles";

interface zCachedImageProps {
    url: string;
    style: StyleProp<ImageStyle>;
}
interface CachedImageProps {
    url: string;
    filename: string;
}
function CachedImage(props: CachedImageProps) {
    const { url, filename } = props;
    if (Platform.OS === "web")
        return (
            <>
                <Image style={styles.image} source={{ uri: url }} />;
                <Text>Fetched image</Text>
            </>
        )
    const url2 = "https://cdn.britannica.com/34/231234-050-5B2280BB/volcanic-eruption-Antigua-Guatemala-volcano.jpg"
    //`${API_URL}/images/${filename}`;
    const [ myUri, setMyUri ] = useState(''); 
    useEffect(() => { Cached(); }, []);
    
    async function Cached() {
        alert('useEffect triggered!');
        log(0, 'useEffect triggered! Filename ', filename,true);

        const name = shorthash(url);
        //save image in user system using the shorthash filename 
        const path = `${FileSystem.cacheDirectory}${filename}`;
        log(0, 'cached image file path', path, true);
        //check if file exists 
        const image = await FileSystem.getInfoAsync(path);
        //if image path exists, display it without loading the external url 
        if (image.exists) {
            setMyUri(image.uri);
            return;
        }
        //if the image path not exists then we cache it in the user system for further use
        const newImage = await FileSystem.downloadAsync(url, path);
        setMyUri(newImage.uri);
    }

    return (
        <>
            {log(0, 'image uri', myUri, true)}
            {/*<Image style={styles.image} source={{ uri: myUri }} />;*/}
            <Text>Cached image {filename}</Text>

        </>
    )
}
