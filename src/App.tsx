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
                <Paper>
                    <Box>
                        <TabContext value={value}>
                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                display: 'flex',
                                justifyContent: 'space-between',
                                backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(28, 28, 30, 0.7)',
                                backdropFilter: 'blur(20px)',
                                position: 'sticky',
                                top: 0,
                                zIndex: 100,
                            }}>
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Organizations" value="0"/>
                                    <Tab label="Manual Order Entry" value="1"/>
                                </Tabs>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, pr: 2}}>

                                </Box>
                            </Box>
                            <Box sx={{
                                minHeight: '900px',
                                minWidth: '300px',
                                bgcolor: 'background.paper',
                                p: 2
                            }}>
                                <TabPanel value="0" sx={{p: 0}}>
                                    <h1>{user?.signInDetails?.loginId}'s Organization's</h1>

                                    <Button onClick={createOrganization} variant='outlined'>New Organization</Button>
                                    <Button variant={'outlined'} color={'error'} onClick={signOut}>Sign-Out</Button>
                                    <List>
                                        {organizations.map((todo) => (
                                            <ListItem
                                                key={todo.id}
                                            >
                                                <ListItemText primary={todo.listName}></ListItemText>
                                                <Button variant={'outlined'} color={'error'} onClick={() => deleteOrganization(todo.id)}>Delete Organization</Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                </TabPanel>
                                <TabPanel value="1" sx={{p: 0}}>
                                    <main>
                                        <h1>{user?.signInDetails?.loginId}'s todos</h1>
                                        <h2>Welcome to my Website.</h2>
                                        <button onClick={createTodo}>+ new</button>
                                        <ul>
                                            {todos.map((todo) => (
                                                <li
                                                    key={todo.id}
                                                    onClick={() => deleteTodo(todo.id)}
                                                >
                                                    {todo.content}
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={signOut}>Sign out</button>
                                        <div>
                                            🥳 App successfully hosted. Try creating a new todo.
                                            <br/>
                                            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                                                Review next step of this tutorial.
                                            </a>
                                        </div>
                                    </main>
                                </TabPanel>
                            </Box>
                        </TabContext>
                    </Box>
                </Paper>

            </ThemeProvider>
        </>
    );
}

export default App;
