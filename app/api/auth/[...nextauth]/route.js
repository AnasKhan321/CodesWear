import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import ConnectToMongo from "@/Database/ConnectToMongo"
import User from "@/Database/User.js"

const handler =  NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),


    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
 
  ],


  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "google"){
        ConnectToMongo()
        

        const currentUser = await  User.findOne({email : user.email})

        if(!currentUser){
    
          const newUser =  new User({
            email : user.email , 
            username : user.email.split("@")[0],
            name : user.name 
          })
          await newUser.save()
          return true 
        }
        return true 

      }else{
        return true 
      }
    },

    async session({ session, user, token }) {
     
        session.user.admin = session.user.email=="anascoder4@gmail.com"?true : false
        session.user.username = session.user.email.split("@")[0]
        session.user.image = session.user.image
        return session      
      }

  }
})

export {handler as GET , handler as POST}