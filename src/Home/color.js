import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export const Color = ({ navigation }) => {
    const [colorList, setColorList] = useState([
        {
            title: "RRRRR color",
            code: "#8ecae6",
            value: 70,
            subcolor: [{
                subcolorid: 1,
                code: "#8ecae6",
                value: 70
            }, {
                subcolorid: 2,
                code: "#219ebc",
                value: 10
            },
            {
                subcolorid: 3,
                code: "#023047",
                value: 50
            },
            {
                subcolorid: 4,
                code: "#ffb703",
                value: 900
            },
            {
                subcolorid: 5,
                code: "#fb8500",
                value: 600
            }
            ]
        },
        {
            title: "EEEEE color",
            code: "#780000",
            value: 70,
            subcolor: [{
                subcolorid: 1,
                code: "#780000",
                value: 70
            }, {
                subcolorid: 2,
                code: "#c1121f",
                value: 10
            },
            {
                subcolorid: 3,
                code: "#fdf0d5",
                value: 50
            },
            {
                subcolorid: 4,
                code: "#003049",
                value: 90
            },
            {
                subcolorid: 5,
                code: "#669bbc",
                value: 80
            }
            ]
        },
        {
            title: "AAAA color",
            code: "#ffbe0b",
            value: 50,
            subcolor: [{
                subcolorid: 1,
                code: "#fb5607",
                value: 70
            }, {
                subcolorid: 2,
                code: "#ff006e",
                value: 10
            },
            {
                subcolorid: 3,
                code: "#ffbe0b",
                value: 50
            },
            {
                subcolorid: 4,
                code: "#8338ec",
                value: 90
            },
            {
                subcolorid: 5,
                code: "#3a86ff",
                value: 80
            }
            ]
        },
        {
            title: "BBBBBB color",
            code: "#1d3557",
            value: 70,
            subcolor: [{
                subcolorid: 1,
                code: "#1d3557",
                value: 70
            }, {
                subcolorid: 2,
                code: "#457b9d",
                value: 10
            },
            {
                subcolorid: 3,
                code: "#a8dadc",
                value: 50
            },
            {
                subcolorid: 4,
                code: "#f1faee",
                value: 90
            },
            {
                subcolorid: 5,
                code: "#e63946",
                value: 80
            }
            ]
        },
        {
            title: "CCCCC color",
            code: "green",
            value: 70,
            subcolor: [{
                subcolorid: 1,
                code: "green",
                value: 70
            }, {
                subcolorid: 2,
                code: "yellow",
                value: 10
            },
            {
                subcolorid: 3,
                code: "black",
                value: 50
            },
            {
                subcolorid: 4,
                code: "pink",
                value: 90
            },
            {
                subcolorid: 5,
                code: "red",
                value: 80
            }
            ]
        },
        {
            title: "DDDDD color",
            code: "#e07a5f",
            value: 10,
            subcolor: [{
                subcolorid: 1,
                code: "#f4f1",
                value: 70
            }, {
                subcolorid: 2,
                code: "#e07a5f",
                value: 10
            },
            {
                subcolorid: 3,
                code: "#3d405b",
                value: 50
            },
            {
                subcolorid: 4,
                code: "#81b29a",
                value: 90
            },
            {
                subcolorid: 5,
                code: "#ef233c",
                value: 80
            }
            ]
        },
    ])
    const setcolor = (item, index, pIndex) => {
        let newdata = colorList.map((items, indexx) => {
            if (indexx == pIndex) {
                return { ...items, value: item.value, code: item.code }
            } else {
                return items;
            }
        })
        setColorList(newdata)
    }
    const renderItemSubColor = (item, index, parentIndex) => {
        // console.log("teim---", item, index, parentIndex)
        return (
            <View style={{ flex: 1, width: "10%", }} >
                <TouchableOpacity
                    onPress={() => setcolor(item, index, parentIndex)}
                    style={{
                        flex: 1, marginLeft: 10, justifyContent: "space-between", backgroundColor: item.code, borderRadius: 3,
                    }}>
                </TouchableOpacity>
                <Text style={{ alignItems: "center", flex: 1, alignSelf: "center" }} >{item.value}</Text>

            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        return (
            <>
                <View style={{ flexDirection: "row", height: 90 }} >
                    <View style={{
                        flex: 0.1, justifyContent: "flex-end", borderRadius: 1,
                        borderTopWidth: index == 0 ? 0.5 : 0,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderBottomWidth: index == colorList.length - 1 ? 0.5 : 0,
                    }} >
                        <View style={{ backgroundColor: item.code, flex: 0.3 }} />
                        <View style={{ flex: 0.2 }} />
                    </View>
                    <View style={{ flex: 0.9, }} >
                        <View style={{ flex: 1, justifyContent: "space-between", }} >
                            <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "space-between", marginLeft: 10, alignItems: "center", }}>
                                <Text style={{ paddingVertical: 8 }} >{item.title}</Text>
                                <View style={{ alignItems: "center" }} >
                                    <Text style={{ justifyContent: "center", paddingHorizontal: 20, height: 20, borderWidth: 1, borderRadius: 3 }} >{item.value}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", flex: 0.5, }} >
                                {item?.subcolor.map((data, indexx) => renderItemSubColor(data, indexx, index))}
                            </View>
                        </View>

                    </View>
                </View>
            </>
        )
    }
    return (
        <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 20 }}>
            <Text onPress={() => navigation.goBack()} >Back</Text>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "blue", marginVertical: 20 }} >Test Stripe</Text>
            <FlatList
                data={colorList}
                renderItem={renderItem}
            />
        </View>
    );
}
