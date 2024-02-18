import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';


export const List = () => {
    const [loading, setLoading] = useState(true)
    const [footerIsLoading, setFooterIsLoading] = useState(false)
    const [currentId, setCurrentId] = useState(0)
    const [catg, setCatg] = useState([])
    const [subCat, setSubCat] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [apiCall, stopApiCall] = useState(false)
    const [productPage, setProductPage] = useState(2)
    const [currentSubId, setCurrentSubId] = useState(0)
    const [productFooterIsLoading, setProductFooterIsLoading] = useState(false)

    const getdata = async (id, page) => {
        try {
            const response = await axios.post(
                'http://esptiles.imperoserver.in/api/API/Product/DashBoard',
                {
                    CategoryId: currentId,
                    DeviceManufacturer: "Google",
                    DeviceModel: "Android SDK built for x86",
                    DeviceToken: "",
                    PageIndex: pageNumber
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const fetchData = async (id = 0, page = 1) => {
        try {
            const data = await getdata(id, page);
            console.log('Fetched data:', data);
            if (catg.length == 0) {
                setCatg(data.Result.Category)
            }
            setCurrentId(data.Result.Category[0].Id)
            setLoading(false);
            setFooterIsLoading(false)
            if (data.Result.Category[0].SubCategories != undefined) {
                setSubCat([...subCat, ...data.Result.Category[0].SubCategories])
            } else {
                stopApiCall(true)
            }
        } catch (error) {
            setFooterIsLoading(false)
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [pageNumber, currentId])

    const getdataSubCat = async () => {
        try {
            const response = await axios.post(
                'http://esptiles.imperoserver.in/api/API/Product/ProductList',
                {
                    "PageIndex": productPage,
                    "SubCategoryId": currentSubId
                }
            );
            console.log('subid product list:', response.data);
            return response.data;
        } catch (error) {
            setProductFooterIsLoading(false)
            console.error('Error:', error);
        }
    };
    const fetchDataSubCat = async () => {
        // setProductFooterIsLoading(true);
        try {
            const data = await getdataSubCat();
            setProductFooterIsLoading(false)
            if (data?.Result != undefined) {
                if (data?.Result.length != 0) {
                    let newdata = subCat.map((item) => {
                        if (item.Id == currentSubId) {
                            return { ...item, Product: [...item.Product, ...data.Result] }
                        } else {
                            return item
                        }
                    })
                    setSubCat(newdata)
                }
            }
        } catch (error) {
            setProductFooterIsLoading(false)
            console.error('Fetch error123:', error);
        }
    };

    useEffect(() => {
        fetchDataSubCat()
    }, [currentSubId])



    function loadMoreData() {
        if (!footerIsLoading && !apiCall) {
            setFooterIsLoading(true)
            setPageNumber(pageNumber + 1);
        }
    }

    function loadMoreDataProduct(item) {
        if (!productFooterIsLoading && !footerIsLoading) {
            setCurrentSubId(item.Id)
        }
    }

    const renderLoader = () => {
        return (
            footerIsLoading ?
                <View style={{ marginVertical: 16, alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#6162EC" />
                </View> : null
        );
    };
    const renderLoaderP = () => {
        return (
            productFooterIsLoading ?
                <View style={{ marginVertical: 16, alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#6162EC" />
                </View> : null
        );
    };
    const renderItemTitle = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 10, }}>
                <Text onPress={() => {
                    setProductFooterIsLoading(false)
                    setSubCat([])
                    setLoading(true)
                    setCurrentId(item.Id)
                    stopApiCall(false)
                    setPageNumber(1)
                }} style={{ color: currentId == item.Id ? "#ffffff" : "grey", fontSize: 16, fontWeight: currentId == item.Id ? "bold" : "300" }} >{item.Name}</Text>
            </View>
        );
    }


    const renderInnerFlatList = ({ item }) => {
        return (
            <FlatList
                horizontal
                data={item?.Product}
                keyExtractor={(productItem) => productItem?.Name}
                renderItem={({ item: productItem }) => (
                    <View style={{ marginLeft: 20, width: 100, }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: productItem.ImageName }}
                            resizeMode="cover"
                        />
                        <Text style={styles.subProName}  >{productItem?.Name}</Text>
                    </View>
                )}
                ListFooterComponent={renderLoaderP()}
                onEndReached={() => loadMoreDataProduct(item)}
                onEndReachedThreshold={0.1}
            />
        );
    };
    return (
        <View style={styles.container} >
            {loading && <View style={styles.mainLoader} >
                <ActivityIndicator size="large" color="#000000" />
            </View>}
            <View style={styles.nav} >
                <View style={styles.navbar} >
                    <Text style={styles.screenTitle} >Impero</Text>
                    <View style={styles.iconView} >
                        <Text style={styles.sideIcon} >T</Text>
                        <Text style={styles.sideIcon} >O</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        horizontal
                        data={catg}
                        renderItem={renderItemTitle}
                    />
                </View>
            </View>
            <View style={styles.catMainView}>
                <FlatList
                    style={styles.catFlatlist}
                    data={subCat}
                    // keyExtractor={(item) => item.Id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <Text style={styles.catTitle} >{item?.Name}</Text>
                            {renderInnerFlatList({ item })}
                        </View>
                    )}
                    ListFooterComponent={renderLoader()}
                    onEndReached={() => loadMoreData()}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    mainLoader: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
        , position: "absolute", justifyContent: "center",
        zIndex: 99, width: "100%", height: "100%"
    },
    navbar: { flexDirection: "row", width: "100%", paddingVertical: 5, alignContent: "flex-end", justifyContent: "flex-end" },
    nav: { backgroundColor: "black", paddingHorizontal: 10 },
    screenTitle: { fontSize: 18, color: "white", flex: 0.5, },
    iconView: { flexDirection: "row", justifyContent: "space-around", flex: 0.1 },
    sideIcon: { fontSize: 20, color: "white" },
    catMainView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    catFlatlist: { flexDirection: "column", width: "100%", },
    catTitle: { fontSize: 13, color: "black", fontWeight: "bold", marginTop: 10, marginLeft: 10, marginBottom: 10 },

    subProName: { fontSize: 12, alignSelf: "center" },
})
