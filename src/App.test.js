import {render, screen} from '@testing-library/react';
import App from './App';
import React from "react";
import {waitFor} from "@testing-library/dom";
import {getJson} from "./remote";

jest.mock("./remote");

test('tests initial state', async () => {
    // mock getJson call
    getJson.mockImplementationOnce(() => Promise.resolve({
            qotd_date: "2020-11-17T00:00:00.000+00:00",
            quote: {
                id: 54949,
                dialogue: false,
                private: false,
                tags: [
                    "success"
                ],
                url: "https://favqs.com/quotes/napoleon-hill/54949-the-starting--",
                favorites_count: 2,
                upvotes_count: 1,
                downvotes_count: 0,
                author: "Napoleon Hill",
                author_permalink: "napoleon-hill",
                body: "The starting point of all achievement is desire.",
            },
        })
    );
    render(<App/>);
    // initially div is empty (btw, not the best idea to mix sync and async checks in one test)
    const div = screen.getByTestId("container");
    expect(div).toBeEmptyDOMElement();
    // wait for the effect
    await waitFor(() => {
        const id = screen.getByTestId("id");
        expect(id).toHaveTextContent("54949");
    });
    await waitFor(() => {
        const author = screen.getByTestId("author");
        expect(author).toHaveTextContent("Napoleon Hill");
    });
    await waitFor(() => {
        const body = screen.getByTestId("body");
        expect(body).toHaveTextContent("The starting point of all achievement is desire.");
    });
});


