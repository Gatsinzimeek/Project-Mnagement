import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    descrption: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not started','In progress', 'Complete'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    }
})

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;