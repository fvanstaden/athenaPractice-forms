import {useEffect, useState} from "react";
import type {Schema} from "../amplify/data/resource";
import {generateClient} from "aws-amplify/data";
import {Box, Button, List, ListItem, ListItemText, Paper, ThemeProvider} from "@mui/material";

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {createAppTheme, initialMode} from "./theme.tsx"
import CssBaseline from '@mui/material/CssBaseline';
import {useAuthenticator} from "@aws-amplify/ui-react";
import { Page } from "./stories/Page.tsx";

const client = generateClient<Schema>();

function App() {

    const [mode] = useState(initialMode);
    const theme = createAppTheme(mode);

    const [value, setValue] = useState('0');

    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const [organizations, setOrganizations] = useState<Array<Schema["Organization"]["type"]>>([]);

    const {user, signOut} = useAuthenticator();

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });

        client.models.Organization.observeQuery().subscribe({
            next: (data) => setOrganizations([...data.items])
        });
    }, []);

   /* const reloadPage = () => {
        window.location.reload();
    };*/


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   /* const toggleColorMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode);
    };
*/
    function createTodo() {
        client.models.Todo.create({content: window.prompt("Todo content")});
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({id})
    }

    function createOrganization() {
        client.models.Organization.create({listName: (window.prompt("Enter a List Name") || 'Default Name')})
    }

    function deleteOrganization(id: string) {
        client.models.Organization.delete({id})
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Page/>
            </ThemeProvider>
        </>
    );
}

export default App;
