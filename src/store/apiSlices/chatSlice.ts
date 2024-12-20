import { apiSlice } from "@/store/api/apiSlice"
export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    FetchChats:builder.query({
      query:()=>{ //console.log("Fetch chat credentials",credentials)
        return {
          url:`/chat/client`,
          method:'GET',
        }
      },
      providesTags: ["Chats"],
    }),
    establishChat:builder.mutation({
      query:(credentials)=>{ //console.log("Fetch chat credentials",credentials)
        return {
          url:`/chat/client/seller/establish/${credentials.sellerId}`,
          method:'GET',
        }
      }
    }),
    FetchChatMessages:builder.query({
      query:(credentials)=>{ //console.log("Fetch chat credentials",credentials)
        return {
          url:`/chat/client/seller/${credentials.chatId}`,
          method:'GET',
        };
      },
      providesTags: ["Messages"],
    }),
    addMessage:builder.mutation({
      query:(credentials)=>{ //console.log("addMessage credentials",credentials)
        return {
          url:`/chat/client/seller/${credentials.chatId}`,
          method:'POST',
          body:{
            message:credentials.message,
            receiverId:credentials.receiverId
          }
        };
      },
      invalidatesTags: ["Chats"]
    }),
  })
})
export const {
  useEstablishChatMutation,
  useFetchChatsQuery,
  useFetchChatMessagesQuery,
  useAddMessageMutation,
} = chatApiSlice