import { clients,projects } from "../sampleData.js";
import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLEnumType } from "graphql";
import ProjectModel from "../Modal/Project.js";
import ClientModel from "../Modal/Client.js";

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        clients: {
            type: ClientType,
            resolve(parent,args) {
                return ClientModel.findById(parent.clientId)
            }
        }
    })
});


// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
});

// Query Data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return ClientModel.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return ClientModel.findById(args.id);
            },
        }, 
        Projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return ProjectModel.find();
            }
        },
        Project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return  ProjectModel.findById(args.id);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        addClient: {
             type: ClientType,
             args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString)},
                phone: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args) {
                const client = new ClientModel({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },
        // Delete A client
        deleteClient: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parent,args) {
                return ClientModel.findByIdAndDelete(args.id);
    
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {type: new GraphQLEnumType({
                     name: 'ProjectStatus',
                     values: {
                        'new': {value: 'Not started'},
                        'Progress': { value: 'In Progress'},
                        'Completed': { value: 'Completed'},
                     }
                }),
                defaultValue: 'Not Started',
            },
            clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve (parent, args) {
                const Project = new ProjectModel({
                    name: args.name,
                    descrption: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return Project.save();
            }
        },
        // Delete Project

        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return ProjectModel.findByIdAndDelete(args.id);
            }
        },

        // Update Project 

        updateProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: { type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                        'new': {value: 'Not started'},
                        'Progress': { value: 'In Progress'},
                        'Completed': { value: 'Completed'},
                        }
                    }),
                },
            },
            resolve(parent,args){
                return ProjectModel.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            },
        },
    },
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation,
})

export default schema;