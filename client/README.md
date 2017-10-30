# React-Redux Client Application

This folder contains the React-Redux Client Application. 


## Components

Here lives our dumb components. I.e they can utilize and manipulate their own state, but will never be linked directly to our redux store, but instead will be passed their necessary functions by their corresponding containers

These are kept in a seperate folder for reuse across different modules.

## Containers

These components connect to our reducers and pass the necessary functions through to their components as props. 

## Actions

Actions for our reducers to perform. The file structure for actions is as follows:

1. Action Names
2. Action Signatures
3. Async Functions (thunks)

## Reducers

This folder contains one file, which combines reducers from our modules together. 





