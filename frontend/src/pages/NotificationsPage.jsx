import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFreindReq, acceptFriendReqs } from '../lib/api';
import { UserCheckIcon, BellIcon, MessageSquareIcon, ClockIcon } from "lucide-react"
import NoNotificationsFound from "../components/NoNotificationsFound.jsx"

const NotificationsPage = () => {

  const queryClient = useQueryClient();

  const { data: friendReqs, isLoading } = useQuery({
    queryKey: ["friendReqs"],
    queryFn: getFreindReq
  })

  const { mutate: acceptReqMutation, isPending } = useMutation({
    mutationFn: acceptFriendReqs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendReqs"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    }
  })

  const incomingReqs = friendReqs?.increq || [];
  const acceptedReqs = friendReqs?.acceptedReq || [];


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingReqs.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingReqs.length}</span>
                </h2>
                <div className='space-y-3 mt-3'>
                  {incomingReqs.map((requests) => (
                    <div
                      key={requests._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">

                              <img src={requests.sender.profilepic} alt={requests.sender.fullname} />

                            </div>
                            <div>
                              <h3 className="font-semibold">{requests.sender.fullname}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {requests.sender.nativelanguage}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                  Learning: {requests.sender.learninglanguage}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => acceptReqMutation(requests._id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>

                      </div>
                    </div>

                  ))}
                </div>
              </section>
            )}

            {acceptedReqs.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedReqs.map((notifications) => (
                    <div key={notifications._id} className="card bg-base-200 shadow-sm" >
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notifications.recipient.profilepic}
                              alt={notifications.recipient.fullname}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{notifications.recipient.fullname}</h3>
                            <p className="text-sm my-1">
                              {notifications.recipient.fullname} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {incomingReqs.length === 0 && acceptedReqs.length === 0 && (
              <NoNotificationsFound />
            )}
          </>)}
      </div>
    </div>
  )
}

export default NotificationsPage